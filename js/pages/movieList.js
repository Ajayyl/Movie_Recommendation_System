// UniVibe — All Movies List Page
// Restores the original "Catalogue" functionality

async function renderMovieList(params) {
  const userAge = parseInt(localStorage.getItem('univibe_age')) || 99;

  // Check for specific filter (e.g., "latest", "popular", "top-rated")
  if (params && params.filter) {
    let title = "Movies";
    let subtitle = "Explore our collection";
    let movies = [];
    let order = 'popularity';

    switch (params.filter) {
      case 'latest':
        title = "🆕 Latest Movies";
        subtitle = "Newest additions to our catalogue";
        order = 'recent';
        movies = (await API.getMovies({ minAge: userAge, order, limit: 42 })).data || [];
        break;
      case 'popular':
        title = "🔥 Popular Movies";
        subtitle = "Trending right now";
        order = 'popularity';
        movies = (await API.getMovies({ minAge: userAge, order, limit: 42 })).data || [];
        break;
      case 'top-rated':
        title = "⭐ Top Rated Movies";
        subtitle = "Highest rated by critics and audiences";
        order = 'rating';
        movies = (await API.getMovies({ minAge: userAge, order, limit: 42 })).data || [];
        break;
      default:
        title = "📚 All Movies";
        subtitle = "Browse our massive catalogue";
        order = 'popularity';
        movies = (await API.getMovies({ minAge: userAge, order, limit: 42 })).data || [];
    }

    // Set global state for Load More pagination
    window.univibeListState = { page: 1, filter: params.filter, userAge, order };

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
          
          <div class="movie-grid stagger">
            ${movies.map(m => renderMovieCard(m)).join('')}
          </div>
          
          ${movies.length === 0 ? `<p>No movies found for your age rating.</p>` : `
            <div style="text-align: center; margin-top: 40px;">
              <button id="load-more-btn" class="btn btn-primary" onclick="loadMoreMovies()">Load More Movies</button>
            </div>
          `}
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
            <div>
              <h2 class="section-title">Movie Library</h2>
              <p class="section-subtitle">Discover movies by mood, theme, and genre.</p>
            </div>
            <a href="#/section/all" class="btn btn-primary" style="display: flex; align-items: center; gap: 8px;">
              <span>📚</span> Browse Entire Catalogue
            </a>
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

      </div>
    </section>
  `;
}

// Global handler for loading next pages in the grid view
window.loadMoreMovies = async function () {
  const state = window.univibeListState;
  if (!state) return;

  const btn = document.getElementById('load-more-btn');
  if (btn) {
    btn.innerHTML = 'Loading...';
    btn.disabled = true;
  }

  state.page += 1;

  try {
    const res = await API.getMovies({ minAge: state.userAge, order: state.order, limit: 42, page: state.page });
    const newMovies = res.data || [];

    if (newMovies.length > 0) {
      const grid = document.querySelector('.movie-grid');
      if (grid) {
        grid.insertAdjacentHTML('beforeend', newMovies.map(m => renderMovieCard(m)).join(''));
      }
      if (btn) {
        btn.innerHTML = 'Load More Movies';
        btn.disabled = false;
      }
    } else {
      if (btn) {
        btn.innerHTML = 'End of Catalogue';
      }
    }
  } catch (err) {
    console.error("Failed to load more movies", err);
    if (btn) {
      btn.innerHTML = 'Error loading. Try again.';
      btn.disabled = false;
    }
  }
}
