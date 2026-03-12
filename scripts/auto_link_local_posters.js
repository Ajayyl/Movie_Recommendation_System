const fs = require('fs');
const path = require('path');
const MOVIES = require('d:/univibe/data/movieData.js');

const postersDir = 'd:/univibe/assets/posters';
const files = fs.readdirSync(postersDir);

const movieToLocal = {};
files.forEach(file => {
    const stats = fs.statSync(path.join(postersDir, file));
    // If it's a real image (not a 1957-byte 404 page)
    if (stats.size > 5000) {
        const match = file.match(/movie_(\d+)\.(jpg|png|jpeg|svg)/);
        if (match) {
            movieToLocal[match[1]] = `/assets/posters/${file}`;
        }
    }
});

const updatedMovies = MOVIES.map(m => {
    if (movieToLocal[m.movie_id]) {
        m.poster = movieToLocal[m.movie_id];
    }
    return m;
});

const out = 'const MOVIES = ' + JSON.stringify(updatedMovies, null, 4) + ';\n\nif (typeof module !== \'undefined\') {\n    module.exports = MOVIES;\n}\n';
fs.writeFileSync('d:/univibe/data/movieData.js', out, 'utf8');

console.log(`Updated ${Object.keys(movieToLocal).length} movies with local posters.`);

const backendPath = 'd:/univibe/backend/baseMovies.json';
if (fs.existsSync(backendPath)) {
    let data = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
    data = data.map(m => {
        if (movieToLocal[m.movie_id]) {
            m.poster = movieToLocal[m.movie_id];
        }
        return m;
    });
    fs.writeFileSync(backendPath, JSON.stringify(data, null, 4), 'utf8');
    console.log('Updated backend/baseMovies.json');
}
