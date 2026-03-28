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
            <h2 class="section-title">On ${platformName}</h2>
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

function renderHome() {
  const userAge = parseInt(localStorage.getItem('univibe_age')) || 99;
  const safeMovies = applyAgeFilter(MOVIES, userAge);
  const trending = getTrending(safeMovies);
  const latest = getLatest(safeMovies);
  const topRated = getTopRated(safeMovies);

  // Pick a featured movie for recommendations (random from trending, or first)
  const featured = trending.length > 0
    ? trending[Math.floor(Math.random() * Math.min(trending.length, 5))]
    : safeMovies[0];

  const isLoggedIn = API.isLoggedIn();
  const user = API.getUser();

  return `
    <!-- Hero Slider -->
    <section class="home-slider-container">
      <div class="home-slider" id="home-hero-slider">
        ${(() => {
          const slidesToRender = trending.slice(0, 5);
          return slidesToRender.map((m, index) => {
            const posterUrl = m.poster;
            return `
                <div class="slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                  <div class="container slide-container">
                    <div class="slide-content">
                      <div class="slide-badge">Trending Now</div>
                      <h1 class="slide-title ${m.title.length > 20 ? 'title-long' : ''}">${m.title}</h1>
                      <div class="slide-meta">
                        <span class="slide-rating">${m.rating_percent || 0}%</span>
                        <span class="slide-year">${m.year}</span>
                        <span class="slide-genre">${Array.isArray(m.genre) ? m.genre.join(', ') : m.genre}</span>
                      </div>
                      <p class="slide-description">${m.synopsis}</p>
                      <div class="slide-actions">
                        <a href="#/movie/${m.movie_id}" class="btn btn-primary">
                          Movie Details
                        </a>
                      </div>
                    </div>
                    <div class="slide-visual">
                      <img src="${posterUrl}" alt="${m.title}" class="hero-poster" />
                    </div>
                  </div>
                </div>
              `;
          }).join('');
        })()}
      </div>
      
      <!-- Slider Dots -->
      <div class="slider-dots">
        ${trending.slice(0, 5).map((_, index) => `
          <div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}" onclick="goToSlide(${index})"></div>
        `).join('')}
      </div>
      
      <!-- Slider Navigation -->
      <button class="slider-nav prev" onclick="moveSlide(-1)">❮</button>
      <button class="slider-nav next" onclick="moveSlide(1)">❯</button>
    </section>

    <!-- Movies For You (Personalized Recommendation Model) -->
    <section class="section recommend-section fade-in-up" id="home-smart-section" style="padding-top: 0; display: ${isLoggedIn ? 'block' : 'none'};">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Movies For You</h2>
            <p class="section-subtitle">Personalized recommendations chosen for your taste</p>
          </div>
          <a href="#/section/ai-picks" class="btn btn-sm btn-outline">View All →</a>
        </div>
        <div id="home-ai-recommendations">
          ${renderAnalysisLoader()}
        </div>
      </div>
    </section>

    <!-- Latest Movies -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Latest Movies</h2>
            <p class="section-subtitle">Newest additions to our catalogue</p>
          </div>
          <a href="#/section/latest" class="btn btn-sm btn-outline">View All →</a>
        </div>
        <div class="movie-row stagger">
          ${latest.slice(0, 10).map(m => renderMovieCard(m)).join('')}
        </div>
      </div>
    </section>

    <!-- Popular Movies (Previously removed) -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Popular</h2>
            <p class="section-subtitle">Most popular picks right now</p>
          </div>
          <a href="#/section/popular" class="btn btn-sm btn-outline">View All →</a>
        </div>
        <div class="movie-row stagger">
          ${trending.slice(0, 10).map(m => renderMovieCard(m)).join('')}
        </div>
      </div>
    </section>

    <!-- Top Rated (Previously removed) -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Top Rated</h2>
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
function showHomeRecommendations(featuredId) {
  const container = document.getElementById('home-recommendations');
  if (!container) return;

  const userAge = parseInt(localStorage.getItem('univibe_age')) || 99;
  const recs = getRecommendations(MOVIES, featuredId, userAge, 6);

  setTimeout(() => {
    if (recs.length > 0) {
      container.innerHTML = `
        <div class="movie-row stagger">
          ${recs.map(item => renderMovieCard(item.movie)).join('')}
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="empty-state" style="padding: 40px 0;">
          <div class="empty-icon">?</div>
          <p style="color: var(--text-muted);">No similar movies found under current age filter.</p>
        </div>
      `;
    }
  }, 1500);
}

/**
 * Load Personalized AI Recommendations (RL Model)
 */
async function loadHomeAIRecommendations() {
  const container = document.getElementById('home-ai-recommendations');
  if (!container) return;

  const res = await API.getRecommendations(10);
  if (!res.ok || !res.data || !res.data.recommendations || res.data.recommendations.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding:40px 0;">
        <div class="empty-icon"><i class="fa-solid fa-brain" style="font-size:48px;"></i></div>
        <p style="color:var(--text-muted);">Interact with more movies to train your AI model!</p>
      </div>
    `;
    return;
  }

  const recs = res.data.recommendations;
  container.innerHTML = `
    <div class="movie-row stagger" style="margin-top:20px; padding-bottom: 24px;">
      ${recs.map(rec => {
        const movie = MOVIES.find(m => m.movie_id === rec.movie_id);
        if (!movie) return '';
        return renderRecommendedCard(movie, rec.reason);
      }).join('')}
    </div>
  `;
}



/**
 * Slider Logic
 */
let currentSlideIndex = 0;
let slideInterval;

function initHomeSlider() {
  const slider = document.getElementById('home-hero-slider');
  if (!slider) return;

  // Reset index to match fresh render
  currentSlideIndex = 0;

  // Clear any existing interval
  if (slideInterval) clearInterval(slideInterval);

  // Set up auto-sliding
  slideInterval = setInterval(() => {
    moveSlide(1);
  }, 6000);
}

window.moveSlide = function(direction) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (slides.length === 0) return;

  slides[currentSlideIndex].classList.remove('active');
  dots[currentSlideIndex].classList.remove('active');

  currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;

  slides[currentSlideIndex].classList.add('active');
  dots[currentSlideIndex].classList.add('active');
  
  // Sync global background
  const bg = slides[currentSlideIndex].dataset.bg;
  if (bg && typeof updateGlobalAppBackground === 'function') {
    updateGlobalAppBackground(bg);
  }
};

window.goToSlide = function(index) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides[index]) return;

  slides[currentSlideIndex].classList.remove('active');
  dots[currentSlideIndex].classList.remove('active');

  currentSlideIndex = index;

  slides[currentSlideIndex].classList.add('active');
  dots[currentSlideIndex].classList.add('active');
  
  // Sync global background
  const bg = slides[currentSlideIndex].dataset.bg;
  if (bg && typeof updateGlobalAppBackground === 'function') {
    updateGlobalAppBackground(bg);
  }

  // Reset timer on manual navigation
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => moveSlide(1), 6000);
  }
};
