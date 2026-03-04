// UniVibe — All Movies List Page
// Restores the original "Catalogue" functionality

async function renderMovieList(params) {
  const userAge = parseInt(localStorage.getItem('univibe_age')) || 99;

  // Check for specific filter (e.g., "latest", "popular", "top-rated")
  if (params && params.filter) {
    let title = "Movies";
    let subtitle = "Explore our collection";
    let movies = [];

    switch (params.filter) {
      case 'latest':
        title = "🆕 Latest Movies";
        subtitle = "Newest additions to our catalogue";
        movies = (await API.getMovies({ minAge: userAge, order: 'recent', limit: 30 })).data || [];
        break;
      case 'popular':
        title = "🔥 Popular Movies";
        subtitle = "Trending right now";
        movies = (await API.getMovies({ minAge: userAge, order: 'popularity', limit: 30 })).data || [];
        break;
      case 'top-rated':
        title = "⭐ Top Rated Movies";
        subtitle = "Highest rated by critics and audiences";
        movies = (await API.getMovies({ minAge: userAge, order: 'rating', limit: 30 })).data || [];
        break;
      default:
        title = "All Movies";
        movies = (await API.getMovies({ minAge: userAge, limit: 30 })).data || [];
    }

    // Render Grid View for Specific Filter
    return `
      <section class="section" style="padding-top: 100px; padding-bottom: 50px;">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">${title}</h2>
              <p class="section-subtitle">${subtitle}</p>
            </div>
            <a href="#/all" class="btn btn-sm btn-outline">← Back to Categories</a>
          </div>
          
          <div class="movie-grid stagger" id="movie-grid-container">
            ${movies.map(m => renderMovieCard(m)).join('')}
          </div>
          
          ${movies.length === 0 ? `<p>No movies found for your age rating.</p>` : ''}
          
          <div id="infinite-scroll-trigger"></div>
          <div id="infinite-scroll-loading" style="display:none; margin-top:20px;">
            ${typeof renderSkeletonGrid !== 'undefined' ? renderSkeletonGrid(10) : ''}
          </div>
        </div>
      </section>
    `;
  }

  // Helper generic fetch for categories
  const fetchCat = async (opts) => (await API.getMovies({ minAge: userAge, limit: 10, order: 'none', ...opts })).data || [];

  // Define categories in order and fetch in parallel
  const categoryDefs = [
    { title: "Cult Classics", req: { tag: 'cult' } },
    { title: "Underrated Gems", req: { tag: 'underrated' } },
    { title: "Family Friendly", req: { tag: 'family-safe' } },
    { title: "Adrenaline Rush", req: { experience: 'intense' } },
    { title: "Emotional Journey", req: { experience: 'emotional' } },
    { title: "Chill & Relax", req: { experience: 'relaxing' } },
    { title: "Animated Worlds", req: { genre: 'Animation' } },
    { title: "Sci-Fi Futures", req: { genre: 'Sci-Fi' } },
    { title: "Laugh Out Loud", req: { genre: 'Comedy' } }
  ];

  const catPromises = categoryDefs.map(c => fetchCat(c.req));
  const catResults = await Promise.all(catPromises);

  const categories = categoryDefs.map((def, i) => ({
    title: def.title,
    movies: catResults[i]
  })).filter(cat => cat.movies && cat.movies.length > 0);

  return `
    <section class="section" style="padding-top: 100px; padding-bottom: 50px;">
      <div class="container">
        <div class="section-header">
            <h2 class="section-title">Movie Library</h2>
            <p class="section-subtitle">Discover movies by mood, theme, and genre.</p>
        </div>

        ${categories.map(cat => `
          <div class="category-section" style="margin-bottom: 40px;">
            <h3 class="category-title" style="font-size: 1.5rem; margin-bottom: 15px; color: var(--text-color);">${cat.title}</h3>
            <div class="movie-row" style="
              display: flex;
              gap: 20px;
              overflow-x: auto;
              padding-bottom: 15px;
              scroll-behavior: smooth;
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            ">
              <style>
                .movie-row::-webkit-scrollbar { display: none; } /* Chrome, Safari, Opera */
              </style>
              ${cat.movies.map(m => `
                <div style="flex: 0 0 auto; width: 200px;">
                  ${renderMovieCard(m)}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        ${categories.length === 0 ? `<p>No movies found for your age rating.</p>` : ''}
      </div>
    </section>
  `;
}

// --- Infinite Scroll Logic ---
let isMovieListLoading = false;
let movieListCurrentPage = 1;
let movieListCurrentFilter = '';
let movieListHasMore = true;

window.setupInfiniteScroll = function (filter) {
  movieListCurrentFilter = filter;
  movieListCurrentPage = 1;
  isMovieListLoading = false;
  movieListHasMore = true;

  const trigger = document.getElementById('infinite-scroll-trigger');
  if (!trigger) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isMovieListLoading && movieListHasMore) {
      loadMoreMovies();
    }
  }, { rootMargin: '200px' });

  observer.observe(trigger);
};

async function loadMoreMovies() {
  if (isMovieListLoading || !movieListHasMore) return;
  isMovieListLoading = true;
  movieListCurrentPage++;

  const loadingIndicator = document.getElementById('infinite-scroll-loading');
  if (loadingIndicator) loadingIndicator.style.display = 'block';

  let order = 'popularity';
  if (movieListCurrentFilter === 'latest') order = 'recent';
  if (movieListCurrentFilter === 'top-rated') order = 'rating';

  const userAge = parseInt(localStorage.getItem('univibe_age')) || 99;

  try {
    const res = await API.getMovies({
      minAge: userAge,
      order: order,
      limit: 30,
      page: movieListCurrentPage
    });

    const newMovies = res.data || [];

    if (newMovies.length === 0 || newMovies.length < 30) {
      movieListHasMore = false;
    }

    if (newMovies.length > 0) {
      const grid = document.getElementById('movie-grid-container');
      if (grid) {
        grid.insertAdjacentHTML('beforeend', newMovies.map(m => renderMovieCard(m)).join(''));
      }
    }
  } catch (err) {
    console.error('Failed to load more movies:', err);
  } finally {
    isMovieListLoading = false;
    if (loadingIndicator) loadingIndicator.style.display = 'none';
  }
}
