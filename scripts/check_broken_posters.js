const fs = require('fs');
const path = require('path');
const MOVIES = require('d:/univibe/data/movieData.js');

const rootDir = 'd:/univibe';
const broken = [];

MOVIES.forEach(movie => {
    if (movie.poster && movie.poster.startsWith('/assets/')) {
        const localPath = path.join(rootDir, movie.poster);
        if (!fs.existsSync(localPath)) {
            broken.push(`${movie.title} (ID: ${movie.movie_id}) -> Missing file: ${movie.poster}`);
        }
    }
});

if (broken.length > 0) {
    console.log('BROKEN LOCAL POSTER LINKS:');
    broken.forEach(b => console.log(b));
} else {
    console.log('ALL LOCAL POSTER LINKS ARE VALID.');
}
