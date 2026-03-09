// ═══════════════════════════════════════════════════════════════
// UniVibe — Frontend ML Brain (Reinforcement Learning)
// Handles all intelligence locally in the browser for offline use.
// ═══════════════════════════════════════════════════════════════

const LocalRL = {
    CONFIG: {
        epsilon: 0.15,
        epsilonDecay: 0.999,
        epsilonMin: 0.05,
        learningRate: 0.1,
        discountFactor: 0.95,
        rewardWeights: {
            click: 1.0,
            view: 0.5,
            search: 0.3,
            rating_positive: 2.0,
            rating_neutral: 0.5,
            rating_negative: -1.0,
            recommend_click: 1.5,
            watchlist: 1.2,
            dwell: 0.8,
            ignore: -0.2,
        }
    },

    // ── Database Simulation ──
    db: {
        getQTable() {
            return JSON.parse(localStorage.getItem('univibe_qtable') || '{}');
        },
        saveQTable(table) {
            localStorage.setItem('univibe_qtable', JSON.stringify(table));
        },
        getInteractions() {
            return JSON.parse(localStorage.getItem('univibe_interactions') || '[]');
        },
        saveInteraction(interaction) {
            const history = this.getInteractions();
            history.unshift({ ...interaction, created_at: new Date().toISOString() });
            localStorage.setItem('univibe_interactions', JSON.stringify(history.slice(0, 500)));
        }
    },

    // ── State Encoding ──
    encodeState(userAge, recentInteractions = []) {
        let dominantGenre = 'general';
        let dominantExperience = 'any';

        if (recentInteractions.length > 0) {
            const genreCounts = {};
            const expCounts = {};
            recentInteractions.slice(0, 10).forEach(i => {
                if (i.genre) genreCounts[i.genre] = (genreCounts[i.genre] || 0) + 1;
                if (i.experience) expCounts[i.experience] = (expCounts[i.experience] || 0) + 1;
            });
            dominantGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'general';
            dominantExperience = Object.entries(expCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'any';
        }

        const hour = new Date().getHours();
        const timeSlot = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : hour < 21 ? 'evening' : 'night';
        return `${dominantGenre}|${dominantExperience}|${timeSlot}`;
    },

    // ── Learning ──
    learn(movieId, eventType, eventValue = '', context = {}) {
        const reward = this.calculateReward(eventType, eventValue);
        const interactions = this.db.getInteractions();
        const userAge = parseInt(localStorage.getItem('univibe_age')) || 18;
        const stateKey = this.encodeState(userAge, interactions);

        // Log interaction
        this.db.saveInteraction({ movie_id: movieId, event_type: eventType, ...context });

        // Update Q-Table
        const qTable = this.db.getQTable();
        const key = `${stateKey}|${movieId}`;
        const currentQ = qTable[key]?.q || 0.0;
        const visits = qTable[key]?.v || 0;

        // Simplified TD Update
        const newQ = currentQ + this.CONFIG.learningRate * (reward - currentQ);

        qTable[key] = { q: newQ, v: visits + 1 };
        this.db.saveQTable(qTable);

        return { reward, newQ, stateKey };
    },

    calculateReward(eventType, value) {
        const weights = this.CONFIG.rewardWeights;
        if (eventType === 'rating') {
            const r = parseInt(value);
            return r >= 4 ? weights.rating_positive : r === 3 ? weights.rating_neutral : weights.rating_negative;
        }
        return weights[eventType] || 0;
    },

    // ── Recommendations ──
    getRecommendations(count = 8) {
        const interactions = this.db.getInteractions();
        const userAge = parseInt(localStorage.getItem('univibe_age')) || 99;
        const stateKey = this.encodeState(userAge, interactions);
        const qTable = this.db.getQTable();

        const rated = new Set(JSON.parse(localStorage.getItem('univibe_ratings') || '[]').map(r => r.movieId));
        const candidates = MOVIES.filter(m => userAge >= m.age_limit);

        const scored = candidates.map(movie => {
            let score = 0;
            let reason = 'Trending';

            // Q-Value matches
            const qData = qTable[`${stateKey}|${movie.movie_id}`];
            if (qData) {
                score += qData.q * 3;
                reason = 'learned from your behavior';
            }

            // Baseline quality
            score += (movie.popularity_score * 0.5) + (movie.rating_percent / 100);

            return { movie, score, reason: '🤖 ' + reason };
        });

        // Epsilon-greedy
        if (Math.random() < this.CONFIG.epsilon) {
            return scored.sort(() => Math.random() - 0.5).slice(0, count).map(s => s.movie);
        }

        return scored.sort((a, b) => b.score - a.score).slice(0, count).map(s => s.movie);
    },

    getUserLearningStats() {
        const interactions = this.db.getInteractions();
        const qTable = this.db.getQTable();
        const ratings = JSON.parse(localStorage.getItem('univibe_ratings') || '[]');
        const watchlist = JSON.parse(localStorage.getItem('univibe_watchlist') || '[]');

        const qValues = Object.values(qTable).map(v => v.q);
        const totalInteractions = interactions.length;
        const avgQValue = qValues.length > 0 ? qValues.reduce((a, b) => a + b, 0) / qValues.length : 0;
        const maxQValue = qValues.length > 0 ? Math.max(...qValues) : 0;

        // Activity breakdown
        const activity = { view: 0, click: 0, rating: 0, recommend_click: 0, watchlist: 0 };
        interactions.forEach(i => { if (activity[i.event_type] !== undefined) activity[i.event_type]++; });

        // Genre heatmap simulation (simplified)
        const genreHeatmap = {};
        interactions.forEach(i => {
            if (!i.genre) return;
            if (!genreHeatmap[i.genre]) genreHeatmap[i.genre] = { view: 0, click: 0, rating: 0, recommend_click: 0 };
            if (genreHeatmap[i.genre][i.event_type] !== undefined) genreHeatmap[i.genre][i.event_type]++;
        });

        // State radar simulation
        const states = {};
        Object.keys(qTable).forEach(k => {
            const state = k.split('|')[0];
            states[state] = (states[state] || 0) + 1;
        });

        return {
            summary: {
                totalInteractions,
                totalQEntries: qValues.length,
                uniqueStates: new Set(Object.keys(qTable).map(k => k.split('|').slice(0, 3).join('|'))).size,
                totalRatings: ratings.length,
                avgQValue: avgQValue.toFixed(2),
                maxQValue: maxQValue.toFixed(2),
                modelMaturity: totalInteractions < 5 ? 'cold_start' : totalInteractions < 20 ? 'learning' : 'mature'
            },
            activityBreakdown: activity,
            genreHeatmap,
            topMovies: Object.entries(qTable).sort((a, b) => b[1].q - a[1].q).slice(0, 5).map(([k, v]) => {
                const id = parseInt(k.split('|').pop());
                const m = MOVIES.find(movie => movie.movie_id === id);
                return { title: m?.title || 'Unknown', q: v.q.toFixed(2) };
            }),
            stateSpace: states
        };
    }
};
