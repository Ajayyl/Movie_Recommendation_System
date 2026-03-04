// UniVibe — Express API Server
// Handles authentication, user tracking, and RL recommendations

const express = require('express');
const cors = require('cors');
const path = require('path');

const auth = require('./auth');
const rlEngine = require('./rlEngine');
const { stmts } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// ──────────────────────────────────
// MIDDLEWARE
// ──────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); // Serve frontend files

// ──────────────────────────────────
// AUTH ROUTES
// ──────────────────────────────────

// Register
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password, displayName, age } = req.body;
    const result = await auth.register(username, email, password, displayName, age);

    if (result.success) {
        res.json(result);
    } else {
        res.status(400).json(result);
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const result = await auth.login(usernameOrEmail, password);

    if (result.success) {
        res.json(result);
    } else {
        res.status(401).json(result);
    }
});

// Get current user profile
app.get('/api/auth/me', auth.authMiddleware, (req, res) => {
    res.json({ success: true, user: req.user });
});

// Update profile
app.put('/api/auth/profile', auth.authMiddleware, (req, res) => {
    const result = auth.updateProfile(req.userUid, req.body);
    res.json(result);
});

// Get avatars list
app.get('/api/auth/avatars', (req, res) => {
    res.json({ avatars: auth.AVATARS });
});

// ──────────────────────────────────
// TRACKING ROUTES (User Interactions)
// ──────────────────────────────────

// Log a user interaction & learn from it
app.post('/api/track', auth.authMiddleware, (req, res) => {
    const { movieId, eventType, eventValue, context } = req.body;

    if (!movieId || !eventType) {
        return res.status(400).json({ error: 'movieId and eventType are required' });
    }

    const validEvents = ['view', 'click', 'search', 'rating', 'recommend_click', 'dwell'];
    if (!validEvents.includes(eventType)) {
        return res.status(400).json({ error: 'Invalid event type' });
    }

    // Learn from interaction (updates RL model)
    const learningResult = rlEngine.learn(
        req.userUid,
        parseInt(movieId),
        eventType,
        eventValue || '',
        context || {}
    );

    res.json({
        success: true,
        learning: learningResult ? {
            stateKey: learningResult.stateKey,
            reward: learningResult.reward,
            qUpdate: {
                old: Math.round(learningResult.oldQ * 100) / 100,
                new: Math.round(learningResult.newQ * 100) / 100,
                error: Math.round(learningResult.tdError * 100) / 100
            }
        } : null
    });
});

// Log search
app.post('/api/track/search', auth.authMiddleware, (req, res) => {
    const { query, resultCount, selectedMovieId } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    stmts.logSearch.run({
        user_uid: req.userUid,
        query,
        result_count: resultCount || 0,
        selected_movie_id: selectedMovieId || null
    });

    res.json({ success: true });
});

// Rate a movie
app.post('/api/rate', auth.authMiddleware, (req, res) => {
    const { movieId, rating } = req.body;

    if (!movieId || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'movieId and rating (1-5) are required' });
    }

    // Save rating
    stmts.upsertRating.run({
        user_uid: req.userUid,
        movie_id: parseInt(movieId),
        rating: parseInt(rating)
    });

    // Learn from rating
    const learningResult = rlEngine.learn(
        req.userUid,
        parseInt(movieId),
        'rating',
        String(rating),
        { source: 'explicit_rating' }
    );

    res.json({ success: true, learning: learningResult });
});

// Get user's rating for a movie
app.get('/api/rate/:movieId', auth.authMiddleware, (req, res) => {
    const rating = stmts.getMovieRating.get(req.userUid, parseInt(req.params.movieId));
    res.json({ rating: rating ? rating.rating : null });
});

// ──────────────────────────────────
// RL RECOMMENDATION ROUTES
// ──────────────────────────────────

// Load movies from database instead of memory
// (Data is too large for memory)

// Get personalized RL recommendations
app.get('/api/recommendations', auth.authMiddleware, (req, res) => {
    const count = parseInt(req.query.count) || 8;
    const userAge = req.user ? (req.user.age || 99) : 99;

    // Fetch a sample of recent/popular candidates instead of all 700k to save memory
    let candidates = stmts.getMovieCandidates.all(userAge, 500).map(r => ({
        ...r,
        genre: JSON.parse(r.genre || '[]'),
        tags: JSON.parse(r.tags || '[]')
    }));

    const recommendations = rlEngine.getRecommendations(
        req.userUid,
        candidates,
        count,
        req.user
    );

    res.json({
        success: true,
        recommendations: recommendations.map(r => ({
            movie: r.movie,
            score: Math.round(r.score * 100) / 100,
            reason: r.reason,
            source: r.source,
            qValue: r.qValue,
            visitCount: r.visitCount
        })),
        meta: {
            count: recommendations.length,
            timestamp: new Date().toISOString()
        }
    });
});

// Get user learning stats (for the profile/analytics page)
app.get('/api/recommendations/stats', auth.authMiddleware, (req, res) => {
    const stats = rlEngine.getUserLearningStats(req.userUid);
    res.json({ success: true, stats });
});

// ──────────────────────────────────
// DASHBOARD ANALYTICS (rich data for charts)
// ──────────────────────────────────
app.get('/api/dashboard', auth.authMiddleware, (req, res) => {
    const uid = req.userUid;

    // 1. All Q-values for distribution chart
    const allQ = stmts.getAllUserQValues.all(uid);

    // 2. Q-value distribution buckets
    const qDistribution = buildDistribution(allQ.map(q => q.q_value), 10);

    // 3. All interactions for timeline
    const interactions = stmts.getUserInteractions.all(uid, 500);

    // 4. Interaction timeline (grouped by hour)
    const timeline = buildTimeline(interactions);

    // 5. Genre interaction heatmap
    const genreBreakdown = {};
    interactions.forEach(i => {
        if (!i.context_genre) return;
        if (!genreBreakdown[i.context_genre]) {
            genreBreakdown[i.context_genre] = { view: 0, click: 0, rating: 0, recommend_click: 0, search: 0, dwell: 0 };
        }
        if (genreBreakdown[i.context_genre][i.event_type] !== undefined) {
            genreBreakdown[i.context_genre][i.event_type]++;
        }
    });

    // 6. Per-movie Q-value heatmap (top 15)
    const movieQMap = {};
    allQ.forEach(q => {
        if (!movieQMap[q.movie_id]) {
            movieQMap[q.movie_id] = { totalQ: 0, count: 0, maxQ: -Infinity, states: [] };
        }
        movieQMap[q.movie_id].totalQ += q.q_value;
        movieQMap[q.movie_id].count++;
        movieQMap[q.movie_id].maxQ = Math.max(movieQMap[q.movie_id].maxQ, q.q_value);
        movieQMap[q.movie_id].states.push({ state: q.state_key, q: Math.round(q.q_value * 100) / 100 });
    });
    const topMovieQ = Object.entries(movieQMap)
        .sort(([, a], [, b]) => b.maxQ - a.maxQ)
        .slice(0, 15)
        .map(([movieId, data]) => {
            let movie = stmts.getMovieById.get(parseInt(movieId));
            let parsedGenre = [];
            if (movie && movie.genre) {
                try { parsedGenre = JSON.parse(movie.genre); } catch (e) { }
            }
            return {
                movie_id: parseInt(movieId),
                title: movie ? movie.title : `Movie #${movieId}`,
                genre: parsedGenre,
                avgQ: Math.round((data.totalQ / data.count) * 100) / 100,
                maxQ: Math.round(data.maxQ * 100) / 100,
                stateCount: data.count,
                states: data.states.slice(0, 5)
            };
        });

    // 7. Rating distribution (1-5 stars)
    const ratings = stmts.getUserRatings.all(uid);
    const ratingDist = [0, 0, 0, 0, 0];
    ratings.forEach(r => { if (r.rating >= 1 && r.rating <= 5) ratingDist[r.rating - 1]++; });

    // 8. Exploration vs exploitation stats
    // We pass a dummy empty array since we just need the history metrics, not generating real recs
    const recommendations = rlEngine.getRecommendations(uid, [], 20, req.user);
    const sourceBreakdown = {};
    recommendations.forEach(r => {
        sourceBreakdown[r.source] = (sourceBreakdown[r.source] || 0) + 1;
    });

    // 9. State-space coverage
    const uniqueStates = [...new Set(allQ.map(q => q.state_key))];
    const stateDetails = uniqueStates.map(sk => {
        const entries = allQ.filter(q => q.state_key === sk);
        return {
            state: sk,
            movieCount: entries.length,
            avgQ: Math.round((entries.reduce((s, e) => s + e.q_value, 0) / entries.length) * 100) / 100,
            maxQ: Math.round(Math.max(...entries.map(e => e.q_value)) * 100) / 100,
            totalVisits: entries.reduce((s, e) => s + e.visit_count, 0)
        };
    }).sort((a, b) => b.totalVisits - a.totalVisits);

    // 10. RL Hyperparameters
    const config = {
        epsilon: rlEngine.CONFIG.epsilon,
        epsilonMin: rlEngine.CONFIG.epsilonMin,
        learningRate: rlEngine.CONFIG.learningRate,
        discountFactor: rlEngine.CONFIG.discountFactor,
        rewardWeights: rlEngine.CONFIG.rewardWeights
    };

    res.json({
        success: true,
        dashboard: {
            qDistribution,
            timeline,
            genreBreakdown,
            topMovieQ,
            ratingDistribution: ratingDist,
            sourceBreakdown,
            stateDetails,
            config,
            summary: {
                totalInteractions: interactions.length,
                totalQEntries: allQ.length,
                uniqueStates: uniqueStates.length,
                totalRatings: ratings.length,
                avgQValue: allQ.length > 0 ? Math.round((allQ.reduce((s, q) => s + q.q_value, 0) / allQ.length) * 100) / 100 : 0,
                maxQValue: allQ.length > 0 ? Math.round(Math.max(...allQ.map(q => q.q_value)) * 100) / 100 : 0,
                modelMaturity: interactions.length < 5 ? 'cold_start' : interactions.length < 20 ? 'learning' : interactions.length < 50 ? 'improving' : 'mature'
            }
        }
    });
});

// Helper: Build histogram distribution
function buildDistribution(values, buckets) {
    if (values.length === 0) return { labels: [], counts: [] };
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const step = range / buckets;
    const labels = [];
    const counts = new Array(buckets).fill(0);
    for (let i = 0; i < buckets; i++) {
        labels.push(Math.round((min + step * i) * 100) / 100);
    }
    values.forEach(v => {
        const idx = Math.min(Math.floor((v - min) / step), buckets - 1);
        counts[idx]++;
    });
    return { labels, counts };
}

// Helper: Build interaction timeline grouped by date
function buildTimeline(interactions) {
    const dayMap = {};
    interactions.forEach(i => {
        const day = i.created_at.split(' ')[0]; // "YYYY-MM-DD"
        if (!dayMap[day]) dayMap[day] = { view: 0, click: 0, rating: 0, recommend_click: 0, search: 0, dwell: 0 };
        if (dayMap[day][i.event_type] !== undefined) dayMap[day][i.event_type]++;
    });
    const sortedDays = Object.keys(dayMap).sort();
    return {
        labels: sortedDays,
        datasets: {
            view: sortedDays.map(d => dayMap[d].view),
            click: sortedDays.map(d => dayMap[d].click),
            rating: sortedDays.map(d => dayMap[d].rating),
            recommend_click: sortedDays.map(d => dayMap[d].recommend_click)
        }
    };
}

// ──────────────────────────────────
// USER HISTORY ROUTES
// ──────────────────────────────────

// Get interaction history
app.get('/api/history', auth.authMiddleware, (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const interactions = stmts.getUserInteractions.all(req.userUid, limit);
    const populated = interactions.map(i => {
        const m = stmts.getMovieById.get(i.movie_id);
        return { ...i, movie_title: m ? m.title : `Movie #${i.movie_id}` };
    });
    res.json({ success: true, interactions: populated });
});

// Get search history
app.get('/api/history/searches', auth.authMiddleware, (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    const searches = stmts.getUserSearches.all(req.userUid, limit);
    const populated = searches.map(s => {
        const m = s.selected_movie_id ? stmts.getMovieById.get(s.selected_movie_id) : null;
        return { ...s, selected_movie_title: m ? m.title : null };
    });
    res.json({ success: true, searches: populated });
});

// Get all ratings
app.get('/api/ratings', auth.authMiddleware, (req, res) => {
    const ratings = stmts.getUserRatings.all(req.userUid);
    res.json({ success: true, ratings });
});

// ──────────────────────────────────
// MOVIES CATALOG API (NEW SCALABLE ROUTES)
// ──────────────────────────────────

app.get('/api/movies', (req, res) => {
    const { db } = require('./database');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const genre = req.query.genre;
    const search = req.query.search;
    const experience = req.query.experience;
    const tag = req.query.tag;
    const platform = req.query.platform;
    const order = req.query.order || 'popularity';
    const minAge = parseInt(req.query.minAge) || 0;

    let query = 'SELECT * FROM movies WHERE age_limit <= ?';
    const params = [minAge];

    if (genre) {
        query += ' AND genre LIKE ?';
        params.push('%"' + genre + '"%');
    }
    if (experience) {
        query += ' AND experience_type = ?';
        params.push(experience);
    }
    if (tag) {
        query += ' AND tags LIKE ?';
        params.push('%"' + tag + '"%');
    }
    if (platform) {
        query += ' AND ottPlatforms LIKE ?';
        params.push('%"name":"' + platform + '"%');
    }
    if (search) {
        query += ' AND title LIKE ?';
        params.push('%' + search + '%');
    }

    if (order === 'popularity') query += ' ORDER BY popularity_score DESC';
    else if (order === 'recent') query += ' ORDER BY year DESC';
    else if (order === 'random') query += ' ORDER BY RANDOM()';

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    try {
        const rows = db.prepare(query).all(...params);
        res.json({
            success: true,
            page,
            limit,
            data: rows.map(r => ({
                ...r,
                genre: JSON.parse(r.genre),
                tags: JSON.parse(r.tags),
                ottPlatforms: JSON.parse(r.ottPlatforms)
            }))
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/movies/:id', (req, res) => {
    const row = stmts.getMovieById.get(parseInt(req.params.id));
    if (!row) return res.status(404).json({ success: false, error: 'Not found' });

    res.json({
        success: true,
        data: {
            ...row,
            genre: JSON.parse(row.genre),
            tags: JSON.parse(row.tags),
            ottPlatforms: JSON.parse(row.ottPlatforms)
        }
    });
});

// Get similar movies
app.get('/api/movies/:id/similar', (req, res) => {
    const { db } = require('./database');
    const source = stmts.getMovieById.get(parseInt(req.params.id));
    if (!source) return res.status(404).json({ success: false, error: 'Not found' });

    const count = parseInt(req.query.limit) || 4;

    // Simplistic DB-based similarity query (could be improved, but sufficient for now)
    // Matches on same experience vibe, prioritizes popularity
    const rows = db.prepare(`
        SELECT * FROM movies
        WHERE movie_id != ? AND experience_type = ?
        ORDER BY popularity_score DESC
        LIMIT 50
    `).all(source.movie_id, source.experience_type);

    // Sort these 50 candidates in Node by how many genres match
    let sourceGenres = [];
    try { sourceGenres = JSON.parse(source.genre); } catch (e) { }

    const candidates = rows.map(r => {
        let currentGenres = [];
        try { currentGenres = JSON.parse(r.genre); } catch (e) { }
        const matchCount = currentGenres.filter(g => sourceGenres.includes(g)).length;
        return {
            ...r,
            genre: currentGenres,
            tags: JSON.parse(r.tags || '[]'),
            ottPlatforms: JSON.parse(r.ottPlatforms || '[]'),
            matchCount
        };
    }).sort((a, b) => b.matchCount - a.matchCount);

    res.json({
        success: true,
        data: candidates.slice(0, count)
    });
});


// ──────────────────────────────────
// HEALTH CHECK
// ──────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'UniVibe ML Backend',
        version: '2.0.0',
        features: ['auth', 'tracking', 'rl-recommendations', 'sqlite-persistence']
    });
});

// ──────────────────────────────────
// START SERVER
// ──────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🎬 UniVibe ML Server running at http://localhost:${PORT}`);
    console.log(`📊 RL Engine: Contextual Multi-Armed Bandit (ε-greedy)`);
    console.log(`🗄️  Database: SQLite @ backend/data/univibe.db`);
    console.log(`🔐 Auth: JWT + bcrypt\n`);
});
