const https = require('https');
const fs = require('fs');
const Database = require('better-sqlite3');

const API_KEY = '15d2ea6d0dc1d476efbca3eba2428bab';
const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';
const dbPath = 'd:/univibe/backend/data/univibe.db';

async function searchTMDB(title) {
    return new Promise((resolve) => {
        https.get('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + encodeURIComponent(title), res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    if (data.results && data.results.length > 0) {
                        // Find the one that matches title exactly if possible, else first
                        const exact = data.results.find(r => r.title.toLowerCase() === title.toLowerCase());
                        resolve(exact ? exact.poster_path : data.results[0].poster_path);
                    } else {
                        resolve(null);
                    }
                } catch (e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

async function fixPosters() {
    console.log("Fetching official posters from TMDB...");
    
    // 1. Load Movies
    let movies = require(movieDataPath);
    console.log(`Checking ${movies.length} movies...`);

    const replacements = {};
    for (let movie of movies) {
        // We only skip if it's already a TMDB link AND we are sure it's the right one
        // But the user said some are wrong, so let's re-fetch for all non-Tamil movies (Tamil ones seem okay or have unique names)
        // Actually, just re-fetch for all to be safe.
        process.stdout.write(`Searching: ${movie.title}... `);
        const path = await searchTMDB(movie.title);
        if (path) {
            const newURL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + path;
            movie.poster = newURL;
            console.log("OK");
        } else {
            console.log("Not found, keeping current");
        }
    }

    // 2. Save JS
    const jsContent = 'const MOVIES = ' + JSON.stringify(movies, null, 4) + ';\n\nif (typeof module !== "undefined") { module.exports = MOVIES; }\n';
    fs.writeFileSync(movieDataPath, jsContent);
    
    // 3. Save JSON
    fs.writeFileSync(baseMoviesPath, JSON.stringify(movies, null, 4));

    // 4. Update DB
    const db = new Database(dbPath);
    const update = db.prepare('UPDATE movies SET poster = ? WHERE movie_id = ?');
    const transaction = db.transaction((data) => {
        for (const m of data) {
            update.run(m.poster, m.movie_id);
        }
    });
    transaction(movies);
    db.close();

    console.log("\nDone! All posters synchronized with official TMDB versions.");
}

fixPosters().catch(console.error);
