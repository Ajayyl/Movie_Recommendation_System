// UniVibe — Shared UI Components
// Rendering only — no recommendation logic.

/**
 * Render a movie card used in grids and rows.
 */
function renderMovieCard(movie) {
  // Use local SVG placeholder if image fails
  const placeholderUrl = generatePlaceholderUrl(movie.title);

  return `
    <div class="movie-card fade-in-up" onclick="trackMovieClick(${movie.movie_id}, false); Router.navigate('/movie/${movie.movie_id}')">
      <div class="poster-wrap">
        <img
          src="${movie.poster}"
          alt="${movie.title}"
          loading="lazy"
          onerror="this.onerror=null; this.src='${placeholderUrl}'"
        />
        <div class="poster-overlay">
          <div class="overlay-rating">⭐ ${movie.rating_percent}%</div>
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
            onerror="this.onerror=null; this.src='${placeholderUrl}'"
          />
          <div class="poster-overlay">
            <div class="overlay-rating">⭐ ${movie.rating_percent}%</div>
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
        ${encodeURIComponent(title)}
      </text>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.7)" text-anchor="middle" dominant-baseline="middle" dy="20">
        Poster Unavailable
      </text>
    </svg>
  `;

  // We need to properly encode the SVG string since we injected unescaped text that could break the URI
  // However, encodeURIComponent on the whole string is safe. Let's make sure the title isn't URI encoded inside the SVG text visually.
  // Wait, if it's encodeURIComponent(title), it will show as %20. We just need to replace unsafe XML chars.
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const finalSvg = `
    <svg width="200" height="300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      
      <!-- Wrap text using foreignObject for better multi-line display -->
      <foreignObject x="10" y="10" width="180" height="280">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%; text-align: center; color: white; font-family: Inter, Arial, sans-serif;">
          <strong style="font-size: 18px; line-height: 1.3;">${safeTitle}</strong>
          <span style="font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 10px;">Poster Unavailable</span>
        </div>
      </foreignObject>
    </svg>
  `;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(finalSvg.trim());
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
 * Render the footer.
 */
function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-content" style="display: flex; flex-wrap: wrap; justify-content: space-between; max-width: 1200px; margin: 0 auto; gap: 40px; text-align: left; padding: 20px 0;">
        <div class="footer-col" style="flex: 1; min-width: 250px;">
          <h3 style="color: var(--text-primary); margin-bottom: 16px; font-size: 20px;">UniVibe</h3>
          <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6;">
            The next generation of AI movie discovery.<br>
            Explore our catalogue of 700K+ movies powered by Machine Learning.
          </p>
        </div>
        
        <div class="footer-col" style="flex: 1; min-width: 150px;">
          <h4 style="color: var(--text-primary); margin-bottom: 16px; font-size: 16px;">Explore</h4>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
            <li><a href="#/movies" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;">Discover</a></li>
            <li><a href="#/all" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;">Library</a></li>
            <li><a href="#/dashboard" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;">RL Dashboard</a></li>
          </ul>
        </div>

        <div class="footer-col" style="flex: 1; min-width: 150px;">
          <h4 style="color: var(--text-primary); margin-bottom: 16px; font-size: 16px;">Connect</h4>
          <div style="display: flex; gap: 15px; font-size: 20px;">
            <a href="#" aria-label="Twitter" style="color: var(--text-muted); text-decoration: none;">𝕏</a>
            <a href="#" aria-label="GitHub" style="color: var(--text-muted); text-decoration: none;">🐙</a>
            <a href="#" aria-label="Discord" style="color: var(--text-muted); text-decoration: none;">💬</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom" style="border-top: 1px solid var(--border-glass); margin-top: 20px; padding-top: 20px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; max-width: 1200px; margin-inline: auto;">
        <div class="footer-text" style="margin: 0; font-size: 14px;">
          Made with 💜 by <a href="#/" aria-label="UniVibe Home">UniVibe</a> · ${new Date().getFullYear()}
        </div>
        <div class="footer-disclaimer" style="margin: 0; font-size: 12px; max-width: 500px; text-align: right;">
          UniVibe is a movie discovery platform. We do not stream or host any content. All streaming links redirect to official external platforms.
        </div>
      </div>
    </footer>
  `;
}
