const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const titles = [
    'No Country for Old Men', 'La La Land'
];

const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';

const fileData = fs.readFileSync(movieDataPath, 'utf8');
const jsonMatch = fileData.match(/const MOVIES \= (\[[\s\S]*\]);/i);
let movies = eval(jsonMatch[1]);

async function fetchOmdbUrl(title) {
    return new Promise((resolve) => {
        const url = `http://www.omdbapi.com/?apikey=thewdb&t=${encodeURIComponent(title)}`;
        http.get(url, res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    resolve(data.Poster && data.Poster !== 'N/A' ? data.Poster : null);
                } catch (e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

function fetchImage(url, dest) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                let loc = res.headers.location;
                if (loc.startsWith('/')) {
                    const u = new URL(url);
                    loc = u.origin + loc;
                }
                return fetchImage(loc, dest).then(resolve);
            }
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => resolve(true));
            } else {
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    let count = 0;
    for (const title of titles) {
        process.stdout.write(`Processing ${title}... `);
        const omdbPosterUrl = await fetchOmdbUrl(title);

        if (omdbPosterUrl) {
            const ext = omdbPosterUrl.split('.').pop().split('?')[0] || 'jpg';
            const movie = movies.find(m => m.title === title);
            if (movie) {
                const dest = path.join('d:/univibe/assets/posters', `movie_${movie.movie_id}.${ext}`);
                const success = await fetchImage(omdbPosterUrl, dest);
                if (success) {
                    movie.poster = `/assets/posters/movie_${movie.movie_id}.${ext}`;
                    console.log('Saved');
                    count++;
                } else {
                    console.log('Failed to download image');
                }
            } else {
                console.log('Movie not found in data');
            }
        } else {
            console.log('No poster found on OMDB');
        }
        await sleep(500); // polite delay
    }

    // Save to movieData.js
    let outStr = 'const MOVIES = ' + JSON.stringify(movies, null, 4) + ';\n';
    outStr += `\nif (typeof module !== 'undefined') {\n    module.exports = MOVIES;\n}\n`;
    fs.writeFileSync(movieDataPath, outStr, 'utf8');

    // Sync to baseMovies.json
    if (fs.existsSync(baseMoviesPath)) {
        let backendData = JSON.parse(fs.readFileSync(baseMoviesPath, 'utf8'));
        backendData.forEach(bm => {
            const md = movies.find(m => m.title === bm.title);
            if (md) bm.poster = md.poster;
        });
        fs.writeFileSync(baseMoviesPath, JSON.stringify(backendData, null, 4));
    }

    console.log(`\nSuccessfully downloaded and updated ${count} posters!`);
})();
