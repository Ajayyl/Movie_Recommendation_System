const API = {
    // ── Local Storage Keys ──
    USER_KEY: 'univibe_user_local',
    TOKEN_KEY: 'univibe_auth_token',
    RATINGS_KEY: 'univibe_ratings',
    WATCHLIST_KEY: 'univibe_watchlist',
    BASE_URL: 'http://localhost:3000/api',
    ML_API_BASE: 'http://127.0.0.1:8000',

    // ── Auth ──
    isLoggedIn() {
        return !!localStorage.getItem(this.USER_KEY);
    },

    getUser() {
        return JSON.parse(localStorage.getItem(this.USER_KEY) || 'null');
    },

    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    },

    getHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    },

    async login(username, password) {
        try {
            const res = await fetch(`${this.BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernameOrEmail: username, password })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
                localStorage.setItem(this.TOKEN_KEY, data.token);
                localStorage.setItem('univibe_age', data.user.age);
                return { ok: true, data };
            }
            return { ok: false, error: data.error };
        } catch (e) {
            console.warn('Backend unavailable, creating local offline session.');
            const localUser = { user_uid: 'local-' + Date.now(), username, display_name: username, age: 18 };
            localStorage.setItem(this.USER_KEY, JSON.stringify(localUser));
            localStorage.setItem(this.TOKEN_KEY, 'offline-token');
            localStorage.setItem('univibe_age', '18');
            return { ok: true, data: { user: localUser, token: 'offline-token' }, localFallback: true };
        }
    },

    async register(username, email, password, displayName, age) {
        try {
            const res = await fetch(`${this.BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, displayName, age })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
                localStorage.setItem(this.TOKEN_KEY, data.token);
                localStorage.setItem('univibe_age', data.user.age);
                return { ok: true, data };
            }
            return { ok: false, error: data.error };
        } catch (e) {
            console.warn('Backend unavailable, creating local offline session.');
            const localUser = { user_uid: 'local-' + Date.now(), username, display_name: displayName, email, age };
            localStorage.setItem(this.USER_KEY, JSON.stringify(localUser));
            localStorage.setItem(this.TOKEN_KEY, 'offline-token');
            localStorage.setItem('univibe_age', age);
            return { ok: true, data: { user: localUser, token: 'offline-token' }, localFallback: true };
        }
    },

    async updateProfile(updates) {
        try {
            const res = await fetch(`${this.BASE_URL}/auth/profile`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(updates)
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
                if (updates.age) localStorage.setItem('univibe_age', updates.age);
                return { ok: true, data };
            }
            return { ok: false, error: data.error };
        } catch (e) {
            return { ok: false, error: 'Update failed' };
        }
    },

    logout() {
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
        window.dispatchEvent(new CustomEvent('univibe:logout'));
    },

    // ── Interaction Tracking (Shared across backends via SQLite) ──
    async trackInteraction(movieId, eventType, eventValue, context) {
        // Update local brain for offline/immediate use
        LocalAI.learn(movieId, eventType, eventValue, context);

        try {
            await fetch(`${this.ML_API_BASE}/track`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ movieId, eventType, eventValue, context })
            });
        } catch (e) { console.warn('Tracking sync failed'); }
    },

    async trackSearch(query, resultCount) {
        try {
            await fetch(`${this.BASE_URL}/track/search`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ query, resultCount })
            });
        } catch (e) { }
    },

    // ── Ratings ──
    async rateMovie(movieId, rating) {
        try {
            const res = await fetch(`${this.BASE_URL}/rate`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ movieId, rating })
            });
            return await res.json();
        } catch (e) {
            // Fallback for offline UX
            return { ok: true };
        }
    },

    async getMovieRating(movieId) {
        try {
            const res = await fetch(`${this.BASE_URL}/rate/${movieId}`, {
                headers: this.getHeaders()
            });
            const data = await res.json();
            return { ok: true, data: { rating: data.rating } };
        } catch (e) {
            return { ok: false, error: 'Could not fetch rating' };
        }
    },

    // ── Watchlist ──
    async addToWatchlist(movieId) {
        const movie = MOVIES.find(m => m.movie_id === movieId);
        let list = JSON.parse(localStorage.getItem(this.WATCHLIST_KEY) || '[]');
        if (!list.includes(movieId)) list.push(movieId);
        localStorage.setItem(this.WATCHLIST_KEY, JSON.stringify(list));
        this.trackInteraction(movieId, 'watchlist', 'add', {
            genre: movie?.genre[0],
            experience: movie?.experience_type
        });
        return { ok: true };
    },

    async removeFromWatchlist(movieId) {
        let list = JSON.parse(localStorage.getItem(this.WATCHLIST_KEY) || '[]');
        list = list.filter(id => id !== movieId);
        localStorage.setItem(this.WATCHLIST_KEY, JSON.stringify(list));
        return { ok: true };
    },

    async checkWatchlist(movieId) {
        const list = JSON.parse(localStorage.getItem(this.WATCHLIST_KEY) || '[]');
        return { inWatchlist: list.includes(movieId) };
    },

    async getWatchlist() {
        const list = JSON.parse(localStorage.getItem(this.WATCHLIST_KEY) || '[]');
        return { ok: true, data: { watchlist: list.map(id => ({ movie_id: id })) } };
    },

    // ── AI Recommendations (Now sourced from FastAPI ML Backend) ──
    async getRecommendations(count = 8) {
        const user = this.getUser();
        if (!user) return { ok: false, error: 'User not logged in' };

        try {
            const response = await fetch(`${this.ML_API_BASE}/recommend?user_id=${user.user_uid}&count=${count}`);
            if (response.ok) {
                const recommendations = await response.json();
                return {
                    ok: true,
                    data: {
                        recommendations: recommendations.map(m => ({
                            ...m,
                            source: 'FastAPI_ML',
                            // XAI fields from enhanced backend
                            explanation: m.explanation || null,
                            similarity: m.similarity || 0,
                            user_pref: m.user_pref || 0,
                            score: m.score || 0,
                        }))
                    }
                };
            }
        } catch (error) {
            console.warn('FastAPI Backend unreachable, falling back to LocalAI:', error);
        }

        // Fallback to LocalAI if FastAPI is unavailable
        const recs = LocalAI.getRecommendations(count);
        return {
            ok: true,
            data: {
                recommendations: recs.map(m => ({
                    movie_id: m.movie_id,
                    reason: '🤖 AI matched your vibe (Local)',
                    source: 'LocalAI',
                    explanation: null,
                    similarity: 0,
                    user_pref: 0,
                    score: 0,
                }))
            }
        };
    },

    async getMovieRecommendations(movieId, count = 5) {
        const user = this.getUser();
        if (!user) return { ok: false, error: 'User not logged in' };

        try {
            const response = await fetch(`${this.ML_API_BASE}/recommend/${movieId}?user_id=${user.user_uid}&count=${count}`);
            if (response.ok) {
                const recommendations = await response.json();
                return {
                    ok: true,
                    data: {
                        recommendations: recommendations.map(m => ({
                            ...m,
                            source: 'FastAPI_Similarity',
                            explanation: m.explanation || null,
                            similarity: m.similarity || 0,
                            user_pref: m.user_pref || 0,
                            score: m.score || 0,
                        }))
                    }
                };
            }
        } catch (error) {
            console.error('FastAPI Recommendation Error:', error);
        }
        return { ok: false, error: 'Could not fetch similarity recommendations' };
    },

    async getHistory() {
        try {
            const res = await fetch(`${this.BASE_URL}/history`, { headers: this.getHeaders() });
            const data = await res.json();
            return { ok: true, data: { interactions: data.interactions } };
        } catch (e) { return { ok: false }; }
    },

    async getSearchHistory() {
        try {
            const res = await fetch(`${this.BASE_URL}/history/searches`, { headers: this.getHeaders() });
            const data = await res.json();
            return { ok: true, data: { searches: data.searches } };
        } catch (e) { return { ok: false }; }
    },

    async getLearningStats() {
        try {
            const res = await fetch(`${this.BASE_URL}/recommendations/stats`, { headers: this.getHeaders() });
            const data = await res.json();
            // Server returns stats at top level (no .summary wrapper)
            const stats = data.stats || {};
            return { ok: true, data: { stats: {
                totalInteractions: stats.totalInteractions || 0,
                modelMaturity: stats.modelMaturity || 'cold_start',
                totalQEntries: stats.totalQEntries || 0,
                uniqueStatesLearned: stats.uniqueStatesLearned || 0,
                avgQValue: stats.avgQValue || 0,
                topGenres: stats.topGenres || [],
                activityBreakdown: stats.activityBreakdown || {}
            } } };
        } catch (e) {
            // Local fallback
            const stats = LocalAI.getUserLearningStats();
            return {
                ok: true,
                data: {
                    stats: {
                        totalInteractions: stats.summary.totalInteractions,
                        modelMaturity: stats.summary.modelMaturity,
                        totalQEntries: stats.summary.totalQEntries,
                        uniqueStatesLearned: stats.summary.uniqueStates,
                        avgQValue: stats.summary.avgQValue,
                        topGenres: [],
                        activityBreakdown: stats.activityBreakdown
                    }
                }
            };
        }
    },

    // ── ML Metrics & Model Info ──
    async getMLMetrics() {
        try {
            const res = await fetch(`${this.BASE_URL}/metrics`);
            if (res.ok) {
                const data = await res.json();
                return { ok: true, data };
            }
        } catch (e) {
            console.warn('ML metrics unavailable:', e);
        }
        return { ok: false, error: 'ML metrics unavailable' };
    },

    async getModelInfo() {
        try {
            const res = await fetch(`${this.ML_API_BASE}/model-info`);
            if (res.ok) {
                const data = await res.json();
                return { ok: true, data };
            }
        } catch (e) {
            console.warn('Model info unavailable:', e);
        }
        return { ok: false, error: 'Model info unavailable' };
    },

    // ── Generic GET (for dashboard/analytics) ──
    async get(url) {
        try {
            const res = await fetch(`${this.BASE_URL.replace('/api', '')}${url}`, { headers: this.getHeaders() });
            const data = await res.json();
            return { ok: true, data };
        } catch (e) {
            return { ok: false, error: 'Server unreachable' };
        }
    }
};
