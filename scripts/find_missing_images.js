const fs = require('fs');
const path = require('path');
const MOVIES = require('d:/univibe/data/movieData.js');

const rootDir = 'd:/univibe';
const missing = [];

MOVIES.forEach(movie => {
    if (movie.poster && movie.poster.startsWith('/assets/')) {
        const localPath = path.join(rootDir, movie.poster);
        if (!fs.existsSync(localPath)) {
            missing.push({ id: movie.movie_id, title: movie.title, path: movie.poster });
        }
    } else if (!movie.poster) {
        missing.push({ id: movie.movie_id, title: movie.title, path: 'EMPTY' });
    }
});

console.log('--- MISSING IMAGES ---');
console.log(JSON.stringify(missing, null, 2));
