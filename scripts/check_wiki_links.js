const MOVIES = require('d:/univibe/data/movieData.js');

MOVIES.forEach(m => {
    if (!m.poster || !m.poster.includes('upload.wikimedia.org')) {
        console.log(`NON-WIKI POSTER: [${m.movie_id}] ${m.title} -> ${m.poster}`);
    }
});
