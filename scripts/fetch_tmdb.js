const https = require('https');
const fs = require('fs');

const API_KEY = '15d2ea6d0dc1d476efbca3eba2428bab';
const titles = [
    'My Neighbor Totoro', 'Pulp Fiction', 'Drive', 'Interstellar', 'Spirited Away',
    'The Wolf of Wall Street', 'Up', 'Lost in Translation', 'Mad Max: Fury Road',
    'The Truman Show', 'Amélie', 'Fight Club', 'Her', 'Eternal Sunshine of the Spotless Mind',
    'John Wick', 'Ratatouille', 'The Departed', "Howl's Moving Castle", 'Parasite',
    'Before Sunrise', 'Whiplash', 'The Princess Bride', 'A Quiet Place', 'The Lion King',
    'Dune', 'Everything Everywhere All at Once', 'Spider-Man: Into the Spider-Verse',
    'Knives Out', 'Gladiator', 'Arrival', 'Ex Machina', 'Joker'
];

async function searchTMDB(title) {
    return new Promise((resolve) => {
        // some tmdb keys might be invalid, fallback to fallback image if no response
        https.get('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + encodeURIComponent(title), res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    if (data.results && data.results.length > 0) {
                        resolve(data.results[0].poster_path);
                    } else {
                        resolve(null);
                    }
                } catch (e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

(async () => {
    const replacements = {};
    for (let title of titles) {
        const path = await searchTMDB(title);
        if (path) {
            replacements[title] = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + path;
            console.log(title + ' -> ' + replacements[title]);
        } else {
            console.log('NoTMDB entry for ' + title);
        }
    }

    // update backend/baseMovies.json
    const backendPath = 'd:/univibe/backend/baseMovies.json';
    if (fs.existsSync(backendPath)) {
        let data = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
        data.forEach(m => {
            if (replacements[m.title]) m.poster = replacements[m.title];
        });
        fs.writeFileSync(backendPath, JSON.stringify(data, null, 4), 'utf8');
    }

    // update data/movieData.js
    const path = 'd:/univibe/data/movieData.js';
    if (fs.existsSync(path)) {
        let fileData = fs.readFileSync(path, 'utf8');
        const jsonMatch = fileData.match(/const MOVIES \= (\[[\s\S]*\]);/i);
        if (jsonMatch) {
            let movies = eval(jsonMatch[1]);
            for (let movie of movies) {
                if (replacements[movie.title]) {
                    movie.poster = replacements[movie.title];
                }
            }
            let outStr = 'const MOVIES = ' + JSON.stringify(movies, null, 4) + ';\n';
            outStr += `\nif (typeof module !== 'undefined') {\n    module.exports = MOVIES;\n}\n`;
            fs.writeFileSync(path, outStr, 'utf8');
            console.log('Successfully updated movieData.js');
        }
    }
})();
