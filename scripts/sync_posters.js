const fs = require('fs');

const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';

const movieDataFile = fs.readFileSync(movieDataPath, 'utf8');
const jsonMatch = movieDataFile.match(/const MOVIES \= (\[[\s\S]*\]);/i);
const movies = eval(jsonMatch[1]);

const baseMovies = JSON.parse(fs.readFileSync(baseMoviesPath, 'utf8'));

let updated = 0;
baseMovies.forEach(bm => {
    const md = movies.find(m => m.title === bm.title);
    if (md && md.poster && !md.poster.includes('placehold.co')) {
        if (bm.poster !== md.poster) {
            bm.poster = md.poster;
            updated++;
        }
    }
});

fs.writeFileSync(baseMoviesPath, JSON.stringify(baseMovies, null, 4), 'utf8');
console.log(`Synced ${updated} posters from movieData.js to baseMovies.json`);
