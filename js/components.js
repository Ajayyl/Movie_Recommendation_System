// UniVibe — Shared UI Components
// Rendering only — no recommendation logic.

/**
 * Render a movie card used in grids and rows.
 */
function renderMovieCard(movie) {
  // Use local SVG placeholder if image fails
  const placeholderUrl = generatePlaceholderUrl(movie.title);

  return `
    <div class="movie-card fade-in-up" onclick="trackMovieClick(${movie.movie_id}, MOVIES.find(m=>m.movie_id===${movie.movie_id})); Router.navigate('/movie/${movie.movie_id}')">
      <div class="poster-wrap">
        <img
          src="${movie.poster}"
          alt="${movie.title}"
          loading="lazy"
          referrerpolicy="no-referrer"
          onerror="this.onerror=null; this.src='${placeholderUrl}'"
        />
        <div class="poster-overlay">
          <div class="overlay-rating">⭐ ${movie.rating_percent}%</div>
          <button class="watch-later-btn" onclick="event.stopPropagation(); toggleWatchlist(event, ${movie.movie_id})" title="Watch Later">
            🔖
          </button>
        </div>
      </div>
      <div class="card-info">
        <div class="card-title" title="${movie.title}">${movie.title}</div>
        <div class="card-meta">
          <span class="genre-badge">${movie.genre[0]}</span>
          <span class="exp-badge ${movie.experience_type}">${movie.experience_type}</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render a recommended movie card with reasoning text.
 * Shows WHY the recommendation was made — valued for explainability.
 */
function renderRecommendedCard(movie, reason) {
  const placeholderUrl = generatePlaceholderUrl(movie.title);

  return `
    <div class="rec-card-wrapper fade-in-up">
      <div class="movie-card" onclick="Router.navigate('/movie/${movie.movie_id}')">
        <div class="poster-wrap">
          <img
            src="${movie.poster}"
            alt="${movie.title}"
            loading="lazy"
            referrerpolicy="no-referrer"
            onerror="this.onerror=null; this.src='${placeholderUrl}'"
          />
          <div class="poster-overlay">
            <div class="overlay-rating">⭐ ${movie.rating_percent}%</div>
            <button class="watch-later-btn" onclick="event.stopPropagation(); toggleWatchlist(event, ${movie.movie_id})" title="Watch Later">
              🔖
            </button>
          </div>
        </div>
        <div class="card-info">
          <div class="card-title" title="${movie.title}">${movie.title}</div>
          <div class="card-meta">
            <span class="genre-badge">${movie.genre[0]}</span>
            <span class="exp-badge ${movie.experience_type}">${movie.experience_type}</span>
          </div>
        </div>
      </div>
      <div class="rec-reason" title="${reason}">
        <span class="rec-reason-icon">💡</span>
        <span class="rec-reason-text">${reason}</span>
      </div>
    </div>
  `;
}

/**
 * Generates a local SVG data URI placeholder for a movie.
 * Uses movie title to deterministically pick a gradient color.
 */
function generatePlaceholderUrl(title) {
  // Simple hash for color variation
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);
  const color1 = `hsl(${hue}, 60%, 20%)`;
  const color2 = `hsl(${(hue + 40) % 360}, 60%, 30%)`;

  // Create SVG with gradient background and centered text
  const svg = `
    <svg width="200" height="300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle" dy="-10">
        ${title.substring(0, 15)}${title.length > 15 ? '...' : ''}
      </text>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.7)" text-anchor="middle" dominant-baseline="middle" dy="20">
        Poster Unavailable
      </text>
    </svg>
  `;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
}

/**
 * Render the analysis loading state.
 */
function renderAnalysisLoader() {
  return `
    <div class="analysis-loader" id="analysis-loader">
      <div class="loader-content">
        <div class="loader-icon">
          <div class="loader-ring"></div>
          <span class="loader-emoji">🧠</span>
        </div>
        <h3 class="loader-title">Analyzing movie similarity...</h3>
        <p class="loader-subtitle">Comparing genres, experience, ratings & popularity</p>
        <div class="loader-bar">
          <div class="loader-bar-fill"></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render a star rating widget for the detail page.
 * Connected to AI engine — explicit feedback improves recommendations.
 */
function renderRatingWidget(movieId) {
  // Check if logged in
  if (!API.isLoggedIn()) {
    return `
      <div class="rating-widget" style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 12px; text-align: center;">
        <p style="color: var(--text-muted); margin-bottom: 12px;">Login to rate this movie and improve your recommendations</p>
        <a href="#/login" class="btn btn-outline btn-sm">Sign In</a>
      </div>
    `;
  }

  // Initial skeleton while we fetch current rating
  setTimeout(() => fetchAndRenderStars(movieId), 10);

  return `
    <div class="rating-widget" id="rating-widget-${movieId}" style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 12px;">
      <div class="rating-label" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span>⭐ Your Rating</span>
        <span id="rating-status-${movieId}" style="font-size: 11px; color: var(--accent-primary); text-transform: uppercase; letter-spacing: 0.5px;"></span>
      </div>
      <div class="star-rating" id="star-rating-${movieId}" style="display: flex; gap: 8px;">
        ${[1, 2, 3, 4, 5].map(i => `
          <span class="star" data-rating="${i}" onclick="handleRating(${movieId}, ${i})" style="font-size: 28px; cursor: pointer; color: rgba(255,255,255,0.1); transition: transform 0.2s ease, color 0.2s ease;">★</span>
        `).join('')}
      </div>
      <p style="margin-top: 12px; font-size: 13px; color: var(--text-muted);">This feeds the AI to learn your specific taste profile.</p>
    </div>
  `;
}

/**
 * Fetch existing rating and update the stars.
 */
async function fetchAndRenderStars(movieId) {
  const result = await API.getMovieRating(movieId);
  const rating = result.ok ? result.data.rating : null;
  updateStarUI(movieId, rating);
}

/**
 * Update the visual state of stars.
 */
function updateStarUI(movieId, rating) {
  const container = document.getElementById(`star-rating-${movieId}`);
  if (!container) return;

  const stars = container.querySelectorAll('.star');
  stars.forEach(star => {
    const val = parseInt(star.dataset.rating);
    if (rating && val <= rating) {
      star.style.color = 'var(--accent-primary)';
      star.style.transform = 'scale(1.1)';
    } else {
      star.style.color = 'rgba(255,255,255,0.1)';
      star.style.transform = 'scale(1)';
    }
  });

  if (rating) {
    const status = document.getElementById(`rating-status-${movieId}`);
    if (status) status.innerText = 'Feedback Saved';
  }
}

/**
 * Handle user clicking a star.
 */
async function handleRating(movieId, rating) {
  // Optimistic UI update
  updateStarUI(movieId, rating);
  
  const status = document.getElementById(`rating-status-${movieId}`);
  if (status) status.innerText = 'Saving...';

  const result = await API.rateMovie(movieId, rating);
  
  if (result.success || result.ok) {
    if (status) status.innerText = 'Feedback Saved';
    // Success animation
    const container = document.getElementById(`rating-widget-${movieId}`);
    if (container) {
      container.classList.add('pulse');
      setTimeout(() => container.classList.remove('pulse'), 500);
    }
  } else {
    if (status) status.innerText = 'Error Saving';
    // Reset if failed
    fetchAndRenderStars(movieId);
  }
}

/**
 * Render the footer.
 */
function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-text">
        Made with 💜 by <a href="#">UniVibe</a> · ${new Date().getFullYear()}
      </div>
      <div class="footer-disclaimer">
        UniVibe is a movie discovery platform. We do not stream or host any content.
        All streaming links redirect to official external platforms.
      </div>
    </footer>
  `;
}
