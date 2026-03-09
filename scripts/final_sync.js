const fs = require('fs');

const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';

const movieDataFile = fs.readFileSync(movieDataPath, 'utf8');
const jsonMatch = movieDataFile.match(/const MOVIES \= (\[[\s\S]*\]);/i);
const movies = eval(jsonMatch[1]);

// Map movie_id to correct poster file if it exists locally
const localPosters = fs.readdirSync('assets/posters');
movies.forEach(m => {
    const found = localPosters.find(f => f.startsWith(`movie_${m.movie_id}.`));
    if (found) {
        m.poster = `/assets/posters/${found}`;
    }
});

// Update movieData.js
let outStr = 'const MOVIES = ' + JSON.stringify(movies, null, 4) + ';\n';
outStr += `\nif (typeof module !== 'undefined') {\n    module.exports = MOVIES;\n}\n`;
fs.writeFileSync(movieDataPath, outStr, 'utf8');

// Update baseMovies.json
if (fs.existsSync(baseMoviesPath)) {
    const baseMovies = JSON.parse(fs.readFileSync(baseMoviesPath, 'utf8'));
    baseMovies.forEach(bm => {
        const md = movies.find(m => m.title === bm.title);
        if (md) bm.poster = md.poster;
    });
    fs.writeFileSync(baseMoviesPath, JSON.stringify(baseMovies, null, 4), 'utf8');
}

console.log('Final poster sync complete.');
