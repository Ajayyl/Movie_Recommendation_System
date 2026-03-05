// UniVibe — Home Page

/**
 * Render a horizontal movie row for a specific OTT platform.
 */
function renderPlatformRow(movies, platformName, icon) {
  const platformMovies = getByPlatform(movies, platformName);
  if (platformMovies.length === 0) return '';

  return `
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">${icon} On ${platformName}</h2>
            <p class="section-subtitle">Available to stream on ${platformName}</p>
          </div>
          <a href="#/platform/${encodeURIComponent(platformName)}" class="btn btn-sm btn-outline">View All →</a>
        </div>
        <div class="movie-row stagger">
          ${platformMovies.slice(0, 8).map(m => renderMovieCard(m)).join('')}
        </div>
      </div>
    </section>
    `;
}

async function renderHome(safeMovies) {
  const userAge = parseInt(localStorage.getItem('univibe_age')) || 99;

  // Fetch from the scalable API instead of sorting local array
  const [popRes, recRes, topRes] = await Promise.all([
    API.getMovies({ minAge: userAge, order: 'popularity', limit: 12 }),
    API.getMovies({ minAge: userAge, order: 'recent', limit: 12 }),
    API.getMovies({ minAge: userAge, order: 'rating', limit: 12 })
  ]);

  const trending = popRes.data || [];
  const latest = recRes.data || [];
  const topRated = topRes.data || [];

  // Pick a featured movie for recommendations (random from trending)
  const featured = trending.length > 0
    ? trending[Math.floor(Math.random() * Math.min(trending.length, 5))]
    : null;

  const isLoggedIn = API.isLoggedIn();
  const user = API.getUser();

  return `
    <!-- Hero -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">🎬 ${isLoggedIn ? `Welcome back, ${user.display_name}!` : 'Your Movie Discovery Hub'}</div>
        <h1 class="hero-title">
          Find Your Next<br>
          <span class="gradient-text">Favourite Movie</span>
        </h1>
        <p class="hero-subtitle">
          ${isLoggedIn
      ? 'Your personal AI learns from every click, search, and rating to give you better recommendations over time.'
      : 'Discover movies that match your vibe. Filter by genre, experience, and mood — then stream on your favourite platform.'
    }
        </p>
        <div class="hero-actions">
          <a href="#/movies" class="btn btn-primary">
            🔍 Start Discovery
          </a>
          ${!isLoggedIn ? `
            <button class="btn btn-outline" onclick="showAuthModal('register')">
              🤖 Get AI Picks
            </button>
          ` : `
            <a href="#/dashboard" class="btn btn-outline">
              🧠 My AI Dashboard
            </a>
          `}
        </div>
      </div>
    </section>

    <!-- RL-Powered Recommendations (logged in users) -->
    ${isLoggedIn ? `
    <section class="section recommend-section" style="padding-top: 0;">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">🤖 AI Picks For You</h2>
            <p class="section-subtitle">Personalized by your reinforcement learning model</p>
          </div>
          <a href="#/dashboard" class="btn btn-sm btn-outline">View AI Dashboard →</a>
        </div>
        <div id="home-rl-recommendations">
          ${renderAnalysisLoader()}
        </div>
      </div>
    </section>
    ` : ''}

    <!-- Recommended For You (content-based) -->
    ${featured ? `
    <section class="section recommend-section" style="padding-top: 0;">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">✨ ${isLoggedIn ? 'Similar to Trending' : 'Recommended For You'}</h2>
            <p class="section-subtitle">Based on "${featured.title}" — movies with similar vibes</p>
          </div>
        </div>
        <div id="home-recommendations">
          ${renderAnalysisLoader()}
        </div>
      </div>
    </section>
    ` : ''}

    <!-- Latest Movies -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">🆕 Latest Movies</h2>
            <p class="section-subtitle">Newest additions to our catalogue</p>
          </div>
          <a href="#/section/latest" class="btn btn-sm btn-outline">View All →</a>
        </div>
        <div class="movie-row stagger">
          ${latest.slice(0, 10).map(m => renderMovieCard(m)).join('')}
        </div>
      </div>
    </section>

    <!-- Popular Movies -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">🔥 Popular</h2>
            <p class="section-subtitle">Most popular picks right now</p>
          </div>
          <a href="#/section/popular" class="btn btn-sm btn-outline">View All →</a>
        </div>
        <div class="movie-row stagger">
          ${trending.slice(0, 10).map(m => renderMovieCard(m)).join('')}
        </div>
      </div>
    </section>

    <!-- Top Rated -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">⭐ Top Rated</h2>
            <p class="section-subtitle">Highest rated by critics and audiences</p>
          </div>
          <a href="#/section/top-rated" class="btn btn-sm btn-outline">View All →</a>
        </div>
        <div class="movie-row stagger">
          ${topRated.slice(0, 10).map(m => renderMovieCard(m)).join('')}
        </div>
      </div>
    </section>

  `;
}

/**
 * Show content-based recommendations after simulated analysis delay.
 */
async function showHomeRecommendations(featuredId) {
  const container = document.getElementById('home-recommendations');
  if (!container) return;

  const recs = await API.getSimilarMovies(featuredId, 6);

  setTimeout(() => {
    if (recs.length > 0) {
      container.innerHTML = `
        <div class="movie-row stagger">
          ${recs.map(item => {
        const reason = "🎯 Similar vibe to " + item.experience_type;
        return renderRecommendedCard(item, reason);
      }).join('')}
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="empty-state" style="padding: 40px 0;">
          <div class="empty-icon">🔍</div>
          <p style="color: var(--text-muted);">No similar movies found under current age filter.</p>
        </div>
      `;
    }
  }, 400);

  // Also load RL recommendations if logged in
  if (API.isLoggedIn()) {
    loadHomeRLRecommendations();
  }
}

/**
 * Load RL-powered recommendations for the home page.
 */
async function loadHomeRLRecommendations() {
  const container = document.getElementById('home-rl-recommendations');
  if (!container) return;

  const res = await API.getRecommendations(6);

  setTimeout(() => {
    if (res.ok && res.data.recommendations.length > 0) {
      const recs = res.data.recommendations;
      container.innerHTML = `
        <div class="movie-row stagger">
          ${recs.map(rec => {
        const movie = rec.movie;
        if (!movie) return '';
        return renderRecommendedCard(movie, rec.reason);
      }).join('')}
        </div>
        <div class="rl-meta-info">
          <span>⚡ Powered by your personal RL model</span>
          <span>🧠 ${[...new Set(recs.map(r => r.source))].join(', ')} signals</span>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="empty-state" style="padding: 40px 0;">
          <div class="empty-icon">🤖</div>
          <p style="color: var(--text-muted);">Browse and rate movies to train your AI model!</p>
          <button class="btn btn-outline btn-sm" onclick="Router.navigate('/movies')" style="margin-top:12px;">Start Exploring</button>
        </div>
      `;
    }
  }, 300);
}
