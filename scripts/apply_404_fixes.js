const fs = require('fs');
const Database = require('better-sqlite3');

const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';
const dbPath = 'd:/univibe/backend/data/univibe.db';

const finalFixes = {
  "Inception": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/lCwO4czSKzL1LP4h85T4b8C0UWD.jpg",
  "The Grand Budapest Hotel": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
  "Finding Nemo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/xVNSgrsvpcAHPnyKf2phYxyppNZ.jpg",
  "Pulp Fiction": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/dRZpdpKLgN9nk57zggJCs1TjJb4.jpg",
  "Interstellar": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6vCU67oYvqxXW.jpg",
  "The Wolf of Wall Street": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/u7ap9592CYZwDfhchLBQtSQHLCf.jpg",
  "Mad Max: Fury Road": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/h9DI7R9Y9ad3mcS99mY7zfsUvA6.jpg",
  "The Dark Knight": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qJ2tWugHbbp7M9ssy6A6KWKGv7l.jpg",
  "Dune": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/d5iIlSXY9Cnpv7STsmVTqh7jOdB.jpg",
  "The Batman": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/74xTEgt7R36Fpooo50r9T25onAs.jpg",
  "Spider-Man: Into the Spider-Verse": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/iiZZu0z9Ho4h96vS9S0unH79asP.jpg",
  "Gladiator": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ty8TGRSspRjsZd36UoLyLS9zD3G.jpg",
  "Arrival": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4mS96mX7VfRveB76KsnM73O8Uis.jpg",
  "Vikram": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npX927S9vT96Swa78UUnmW9YIuV.jpg",
  "Enthiran": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4Y0VoR5Nxi33SALjvd5j9UfkZEe.jpg"
};

function applyUpdates() {
    console.log("Applying final 404 poster fixes...");

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

    console.log("All 404 fixes applied successfully.");
}

applyUpdates();
