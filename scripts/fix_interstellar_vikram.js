const fs = require('fs');
const Database = require('better-sqlite3');

const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';
const dbPath = 'd:/univibe/backend/data/univibe.db';

const fixes = {
  'Interstellar': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg',
  'Vikram': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/ayBcfq7djGJvMFgcfot8Ybu9j5x.jpg'
};

function applyUpdates() {
    console.log("Applying specific poster fixes for Interstellar and Vikram...");

    // 1. Update movieData.js
    let MOVIES = require(movieDataPath);
    let updatedCount = 0;
    
    MOVIES.forEach(m => {
        if (fixes[m.title]) {
            m.poster = fixes[m.title];
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

    transaction(fixes);
    db.close();
    console.log("Updated univibe.db");

    console.log("All fixes applied successfully.");
}

applyUpdates();
