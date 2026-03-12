const MOVIES = require('d:/univibe/data/movieData.js');
MOVIES.forEach(m => {
    console.log(`[${m.movie_id}] ${m.title} -> ${m.poster}`);
});
