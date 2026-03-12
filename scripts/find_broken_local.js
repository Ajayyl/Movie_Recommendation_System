const fs = require('fs');
const path = require('path');
const MOVIES = require('d:/univibe/data/movieData.js');

const rootDir = 'd:/univibe';
const detailedBroken = [];

MOVIES.forEach(movie => {
    if (movie.poster && movie.poster.startsWith('/assets/')) {
        const localPath = path.join(rootDir, movie.poster);
        if (fs.existsSync(localPath)) {
            const stats = fs.statSync(localPath);
            if (stats.size < 5000) {
                detailedBroken.push({ id: movie.movie_id, title: movie.title, path: movie.poster, size: stats.size });
            }
        } else {
            detailedBroken.push({ id: movie.movie_id, title: movie.title, path: movie.poster, size: 0 });
        }
    }
});

console.log('--- DETAILED BROKEN MOVIES ---');
console.log(JSON.stringify(detailedBroken, null, 2));
