// UniVibe — Platform Page (shows all movies on a specific OTT platform)

async function renderPlatform(params) {
  const platformName = decodeURIComponent(params.name || '');

  // We don't have all platforms in memory anymore, so we'll just mock it or rely on a predefined list
  const platforms = [
    { name: 'Netflix', icon: '🟥' },
    { name: 'Prime Video', icon: '🟦' },
    { name: 'Disney+', icon: '✨' },
    { name: 'HBO Max', icon: '🟣' },
    { name: 'Hulu', icon: '🟩' },
    { name: 'Apple TV', icon: '🍏' }
  ];

  const platformMeta = platforms.find(p => p.name === platformName);
  const icon = platformMeta ? platformMeta.icon : '📺';

  const userAge = parseInt(localStorage.getItem('univibe_age')) || 99;

  // Fetch up to 50 movies dynamically to save data
  const res = await API.getMovies({ minAge: userAge, platform: platformName, limit: 50 });
  const platformMovies = res.data || [];

  return `
    <div class="category-header">
      <div class="cat-icon fade-in" style="font-size: 56px;">${icon}</div>
      <h1 class="fade-in">${platformName}</h1>
      <p class="fade-in">Movies available to stream on ${platformName}</p>
    </div>

    <section class="section" style="padding-top: 0;">
      <div class="container">
        <a class="back-link" href="#/">← Back to Home</a>
        <p class="section-subtitle" style="margin-bottom: 24px;">${platformMovies.length} movies available</p>
        ${platformMovies.length > 0 ? `
          <div class="movie-grid stagger">
            ${platformMovies.map(m => renderMovieCard(m)).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-icon">📺</div>
            <h3>No movies found</h3>
            <p>No movies currently listed for ${platformName}</p>
          </div>
        `}
      </div>
    </section>
    `;
}
