// UniVibe — Movie Detail Page

function renderDetail(params) {
  const movieId = parseInt(params.id);
  const movie = MOVIES.find(m => m.movie_id === movieId);

  if (!movie) {
    return `
      <div class="empty-state" style="padding-top: 140px;">
        <div class="empty-icon">🚫</div>
        <h3>Movie not found</h3>
        <p>The movie you're looking for doesn't exist.</p>
        <a href="#/" class="btn btn-primary" style="margin-top: 20px;">← Go Home</a>
      </div>
    `;
  }

  // Check age filter
  const userAge = parseInt(localStorage.getItem('univibe_age')) || 99;
  if (userAge < movie.age_limit) {
    return `
      <div class="empty-state" style="padding-top: 140px;">
        <div class="empty-icon">🔒</div>
        <h3>Age-Restricted Content</h3>
        <p>This movie requires age ${movie.age_limit}+. Please update your age to access.</p>
        <a href="#/" class="btn btn-primary" style="margin-top: 20px;">← Go Home</a>
      </div>
    `;
  }

  const ageBadgeText = movie.age_limit === 0 ? 'All' : movie.age_limit + '+';

  return `
    <div class="detail-page">
      <div class="container">
        <a class="back-link" href="#/movies">← Back to Discovery</a>

        <div class="detail-hero fade-in">
          <!-- Poster -->
          <div class="detail-poster">
            <img
              src="${movie.poster}"
              alt="${movie.title}"
              onerror="this.src='https://via.placeholder.com/300x450/1a1a2e/7c3aed?text=${encodeURIComponent(movie.title)}'"
            />
          </div>

          <!-- Info -->
          <div class="detail-info">
            <h1 class="detail-title">${movie.title}</h1>
            <div class="detail-year">${movie.year}</div>

            <div class="detail-badges">
              ${movie.genre.map(g => `<span class="genre-badge">${g}</span>`).join('')}
              <span class="exp-badge ${movie.experience_type}">${movie.experience_type}</span>
              <span class="genre-badge" style="background: rgba(255,255,255,0.08); color: var(--text-secondary);">${ageBadgeText}</span>
            </div>

            <p class="detail-synopsis">${movie.synopsis}</p>

            ${movie.quote ? `
            <blockquote class="detail-quote">
              <span class="detail-quote-icon">💭</span>
              <p>${movie.quote}</p>
            </blockquote>
            ` : ''}

            ${movie.trailer ? `
            <!-- Trailer -->
            <div class="trailer-section">
              <div class="rating-label" style="margin-bottom: 14px;">🎬 Watch Trailer</div>
              <div class="trailer-container" id="trailer-container">
                <div class="trailer-thumbnail" onclick="playTrailer('${movie.trailer}')">
                  <img src="https://img.youtube.com/vi/${movie.trailer}/hqdefault.jpg" alt="${movie.title} Trailer" />
                  <div class="trailer-play-btn">
                    <svg viewBox="0 0 68 48" width="68" height="48"><path d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.6c-3 .7-4.6 3.2-5.4 6.1C.1 13 0 24 0 24s.1 11 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.6c3-.7 4.6-3.2 5.4-6.1C67.9 35 68 24 68 24s-.1-11-1.5-16.3z" fill="#FF0000"/><path d="M45 24L27 14v20" fill="#fff"/></svg>
                  </div>
                </div>
              </div>
            </div>
            ` : ''}

            <!-- Rating -->
            <div class="rating-section">
              <div class="rating-label">Reference Rating (avg. IMDb, Rotten Tomatoes, Metacritic)</div>
              <div class="rating-bar-outer">
                <div class="rating-bar-inner" style="width: 0%;" data-target="${movie.rating_percent}"></div>
              </div>
              <div class="rating-value">${movie.rating_percent}%</div>
              <div class="rating-note">Ratings shown for reference only — not the sole factor in recommendations</div>
            </div>

            <!-- User Star Rating Widget (RL-connected) -->
            ${renderRatingWidget(movieId)}

            <!-- Movie Metadata -->
            <div class="detail-metadata">
              <div class="metadata-item">
                <span class="metadata-label">Popularity</span>
                <span class="metadata-value">${(movie.popularity_score * 100).toFixed(0)}%</span>
              </div>
              <div class="metadata-item">
                <span class="metadata-label">Experience</span>
                <span class="metadata-value exp-badge ${movie.experience_type}" style="font-size: 13px;">${movie.experience_type}</span>
              </div>
              <div class="metadata-item">
                <span class="metadata-label">Age Limit</span>
                <span class="metadata-value">${ageBadgeText}</span>
              </div>
            </div>

            <!-- OTT Platforms -->
            <div class="ott-section">
              <div class="rating-label" style="margin-bottom: 14px;">Watch On</div>
              <div class="ott-grid">
                ${movie.ottPlatforms.map(p => `
                  <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="ott-link">
                    ${getOTTIcon(p.name)} ${p.name}
                    <span class="ott-arrow">↗</span>
                  </a>
                `).join('')}
              </div>
            </div>

            <!-- Actions -->
            <div class="detail-actions" style="margin-top: 24px;">
              <button id="watchlist-toggle-btn" class="btn btn-outline" style="width: 100%; justify-content: center;" onclick="toggleWatchlist(event, ${movieId})">
                🔖 Add to Watch Later
              </button>
            </div>
          </div>
        </div>

        <!-- Similar Movies with Loading State -->
        <div class="section recommend-section" style="padding-top: 0;">
          <div class="section-header">
            <div>
              <h2 class="section-title">✨ Recommended For You</h2>
              <p class="section-subtitle">If you liked ${movie.title}, you might enjoy these</p>
            </div>
          </div>
          <div id="detail-recommendations">
            ${renderAnalysisLoader()}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Show recommendations on the detail page after analysis delay.
 * Displays reasoning text under each recommended card for explainability.
 */
function showDetailRecommendations(movieId) {
  const container = document.getElementById('detail-recommendations');
  if (!container) return;

  const userAge = parseInt(localStorage.getItem('univibe_age')) || 99;
  const recs = getRecommendations(MOVIES, movieId, userAge, 6);

  setTimeout(() => {
    if (recs.length > 0) {
      container.innerHTML = `
        <div class="movie-row stagger">
          ${recs.map(item => {
        // Wrap card to track recommendation clicks
        const card = renderRecommendedCard(item.movie, item.reason);
        return card.replace(
          `onclick="Router.navigate('/movie/${item.movie.movie_id}')"`,
          `onclick="trackRecommendationClick(${item.movie.movie_id}, MOVIES.find(m=>m.movie_id===${item.movie.movie_id})); Router.navigate('/movie/${item.movie.movie_id}')"`
        );
      }).join('')}
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="empty-state" style="padding: 40px 0;">
          <div class="empty-icon">🔍</div>
          <h3>No Similar Movies Found</h3>
          <p style="color: var(--text-muted);">No similar movies found under current age filter. Try updating your age to see more recommendations.</p>
        </div>
      `;
    }
  }, 1500);
}

function getOTTIcon(name) {
  const logos = {
    'Netflix': '<svg class="ott-logo" viewBox="0 0 24 24" fill="#E50914"><path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24h-4.715zm8.489 0v9.63L18.6 22.951c-.043-7.178-.05-15.36-.05-22.95h-4.662zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/></svg>',
    'Prime Video': '<svg class="ott-logo" viewBox="0 0 24 24" fill="#00A8E1"><path d="M1.07 17.093c-.063.063-.032.19.063.253l.988.542c.064.032.159.032.223-.032.732-.795 1.685-2.577 2.101-3.34l.032-.064c.795-1.463 1.653-3.085 2.417-4.706.922-1.94 1.876-4.075 2.576-5.697.064-.127.032-.222-.063-.286-.987-.478-2.067-.795-3.149-.954a.195.195 0 00-.19.064c-.764 1.78-1.717 4.042-2.608 5.982a114.22 114.22 0 01-2.39 4.238zm14.79 4.03c-3.498 1.398-7.218 2.07-10.589 2.07-5.347 0-10.12-1.685-13.839-4.516-.255-.193-.032-.51.286-.35 4.104 2.037 8.526 3.085 13.236 3.085 3.18 0 6.678-.636 9.922-1.94.477-.222.891.285.477.636l.507 1.015zm1.462-1.622c-.35-.445-2.32-.222-3.212-.096-.255.032-.286-.19-.064-.35 1.558-1.112 4.138-.795 4.424-.413.318.382-.064 3.054-1.558 4.325-.222.19-.445.096-.35-.16.35-.859 1.112-2.862.76-3.307z"/></svg>',
    'Disney+': '<svg class="ott-logo" viewBox="0 0 24 24" fill="#113CCF"><path d="M2.064 8.639C.856 8.865.09 9.234.09 9.234s1.206-.303 2.292-.217c1.086.086 2.239.476 2.239.476s-.438-.363-1.17-.572c-.73-.21-1.387-.282-1.387-.282zM8.156 7.136c-1.49.207-2.225.642-2.225.642s1.32-.213 2.52-.06c1.2.153 2.488.657 2.488.657s-.53-.386-1.337-.673c-.807-.287-1.446-.566-1.446-.566zm5.847 1.442c.917.21 1.853.717 1.853.717s-.833-.596-2.2-.813c-1.368-.217-2.457-.023-2.457-.023s1.887-.09 2.804.12zm-6.48-4.2c-1.34.05-2.4.376-2.4.376s1.523-.24 2.833-.15c1.31.09 2.803.51 2.803.51s-.897-.46-1.897-.63c-.5-.085-1.01-.12-1.34-.106zm13.41 4.78c-.87-.63-1.44-.87-1.44-.87s.84.54 1.44 1.17c.6.63.93 1.29.93 1.29s-.06-.96-.93-1.59zm-3.69-3.78c-1.21-.36-2.22-.33-2.22-.33s1.08.09 2.13.48c1.05.39 2.01 1.05 2.01 1.05s-.71-.84-1.92-1.2z"/></svg>',
    'HBO Max': '<svg class="ott-logo" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M7.042 16.896H4.414v-3.754H2.708v3.754H.01V7.896h2.698v3.074h1.706V7.896h2.628v9zm6.13-7.2v5.4a1.8 1.8 0 01-1.8 1.8H8.372a1.8 1.8 0 01-1.8-1.8v-5.4a1.8 1.8 0 011.8-1.8h3a1.8 1.8 0 011.8 1.8zm-2.4.3c0-.198-.102-.3-.3-.3h-.6c-.198 0-.3.102-.3.3v4.8c0 .198.102.3.3.3h.6c.198 0 .3-.102.3-.3v-4.8zm10.858-2.1h-3.6c-.498 0-.6.102-.6.6v1.8h2.1v1.8h-2.1v1.8h2.7v1.8c0 .498-.102.6-.6.6h-4.2c-.498 0-.6-.102-.6-.6v-7.8c0-.498.102-.6.6-.6H24v1.8h-2.37z"/></svg>',
    'Apple TV': '<svg class="ott-logo" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.55 4.28-3.74 4.25z"/></svg>',
    'Hulu': '<svg class="ott-logo" viewBox="0 0 24 24" fill="#1CE783"><path d="M2 2v20h4.8v-7.56c0-.7.56-1.24 1.24-1.24H10c.68 0 1.24.56 1.24 1.24V22H16V12.64A5.44 5.44 0 0010.56 7.2H6.8V2zm16 0v20h4.8V2z"/></svg>',
    'Paramount+': '<svg class="ott-logo" viewBox="0 0 24 24" fill="#0064FF"><path d="M12 0L2 9v6l10-9 10 9V9zm0 7.5L2 16.5V21l10-9 10 9v-4.5z"/></svg>',
    'Peacock': '<svg class="ott-logo" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
  };
  return logos[name] || '<span class="ott-logo-fallback">🎬</span>';
}

function playTrailer(ytId) {
  const container = document.getElementById('trailer-container');
  if (!container) return;
  container.innerHTML = `
    <div class="trailer-iframe-wrap">
      <iframe 
        src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    </div>
  `;
}

/**
 * Animate the rating bar on the detail page.
 */
function animateRatingBar() {
  setTimeout(() => {
    const bar = document.querySelector('.rating-bar-inner');
    if (bar) {
      bar.style.width = bar.dataset.target + '%';
    }
  }, 200);
}
