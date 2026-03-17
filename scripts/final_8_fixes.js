const fs = require('fs');
const Database = require('better-sqlite3');

const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';
const dbPath = 'd:/univibe/backend/data/univibe.db';

const finalFixes = {
  "Interstellar": "https://image.tmdb.org/t/p/w500/xrgBLpPMXWXKdyj5r36RVfmkRdb.jpg",
  "Mad Max: Fury Road": "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
  "The Dark Knight": "https://image.tmdb.org/t/p/w500/pKKvCaL1TPTVtbI6EeliyND3api.jpg",
  "Dune": "https://image.tmdb.org/t/p/w500/sFkbIbsH9bOMrwur55ZpYQ29Ekd.jpg",
  "The Batman": "https://image.tmdb.org/t/p/w500/7YncShtIGNJP5euTPSZGxGsImaN.jpg",
  "Spider-Man: Into the Spider-Verse": "https://image.tmdb.org/t/p/w500/AeGrue5mIPMPoS2U7htptMvjfwZ.jpg",
  "Gladiator": "https://image.tmdb.org/t/p/w500/mZ3NNmHsdf3HGdHDDQLT6aJAe2c.jpg",
  "Arrival": "https://image.tmdb.org/t/p/w500/nPd1q0E7UMwfuWOwNWqKakh0JBh.jpg"
};

function applyUpdates() {
    console.log("Applying final validated w500 poster fixes...");

    // 1. Update movieData.js
    let MOVIES = require(movieDataPath);
    let updatedCount = 0;
    
    MOVIES.forEach(m => {
        if (finalFixes[m.title]) {
            m.poster = finalFixes[m.title];
            updatedCount++;
        }
    });

    const jsContent = 'const MOVIES = ' + JSON.stringify(MOVIES, null, 4) + ';\n\nif (typeof module !== "undefined") { module.exports = MOVIES; }\n';
    fs.writeFileSync(movieDataPath, jsContent);
    console.log(`Updated movieData.js (${updatedCount} posters)`);

    // 2. Update baseMovies.json
    fs.writeFileSync(baseMoviesPath, JSON.stringify(MOVIES, null, 4));
    console.log("Updated baseMovies.json");

    // 3. Update univibe.db
    const db = new Database(dbPath);
    const update = db.prepare('UPDATE movies SET poster = ? WHERE title = ?');
    
    const transaction = db.transaction((updates) => {
        for (const [title, poster] of Object.entries(updates)) {
            update.run(poster, title);
        }
    });

    transaction(finalFixes);
    db.close();
    console.log("Updated univibe.db");

    console.log("All fixes applied successfully.");
}

applyUpdates();
