const fs = require('fs');
const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';

const updates = {
    54: "qvsiJKdDxPs",
    53: "FaQe8JFGdaM",
    57: "4bqM64EJY2c",
    56: "B2yC1jpAYvQ",
    55: "oP88LHBukW8",
    60: "aW_j4pNvG98",
    67: "pgfUzQ8nzBY",
    66: "Gc6dEDnL8JA",
    62: "jgYYxs_d_bo",
    61: "HZWlRm8vLxc"
};

function updateFile(path, isJs = false) {
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');
    let movies;
    
    if (isJs) {
        const match = content.match(/const MOVIES \= (\[[\s\S]*\]);/);
        movies = eval(match[1]);
    } else {
        movies = JSON.parse(content);
    }
    
    movies.forEach(m => {
        if (updates[m.movie_id]) {
            m.trailer = updates[m.movie_id];
        }
    });
    
    let out;
    if (isJs) {
        out = 'const MOVIES = ' + JSON.stringify(movies, null, 4) + ';\n\nif (typeof module !== "undefined") { module.exports = MOVIES; }\n';
    } else {
        out = JSON.stringify(movies, null, 4);
    }
    
    fs.writeFileSync(path, out, 'utf8');
    console.log(`Updated ${path}`);
}

updateFile(movieDataPath, true);
updateFile(baseMoviesPath, false);
