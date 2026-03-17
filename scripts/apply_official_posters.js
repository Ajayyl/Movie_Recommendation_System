const fs = require('fs');
const Database = require('better-sqlite3');

const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';
const dbPath = 'd:/univibe/backend/data/univibe.db';

const posterUpdates = {
    "The Shawshank Redemption": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    "My Neighbor Totoro": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/vOdK4W6AKWxkaK73FMEmGg7qk0B.jpg",
    "Coco": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/55UxVUJE3NKNfjrFt2FDdDmpNCd.jpg",
    "Drive": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/2wlK8Q8pJdyGSk0Y5SqVTjVu3Nk.jpg",
    "The Secret Life of Walter Mitty": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/67x2nhfCU422tiyLcMgvVmj1K6k.jpg",
    "Spirited Away": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/zAC8iUgWLdCOrZVHJjYUYdGSjdK.jpg",
    "Up": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jX6cvQtuHTejs9HZ7IDEgKV3KDr.jpg",
    "Moonlight": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qLnfEmPrDjJfPyyddLJPkXmshkp.jpg",
    "The Matrix": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/q4H9IreGqWgQcXq1JvvhcgfSN2w.jpg",
    "Parasite": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    "Kadaisi Ulaga Por": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/5QMqnVJk2whlN2OB6zxAKHxjxXO.jpg",
    "Lubber Pandhu": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jNyLZjIgaYVkBli2JihHwABlAPY.jpg",
    "Garudan": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/xLBfXgJAKYqUQmq8HkD9CUFiaMm.jpg",
    "Leo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/t1oAdt8JjUs4sHEBvE8fKtjV7er.jpg",
    "Master": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/wjbOlovDadOdPKkSAMohLCjbIsc.jpg",
    "Jailer": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/pTmMxAHqX4vsIDE6HPPxOR0Q6TN.jpg"
};

function applyUpdates() {
    console.log("Updating posters with official TMDB links...");

    // 1. Update movieData.js
    let MOVIES = require(movieDataPath);
    let updatedCount = 0;
    
    MOVIES.forEach(m => {
        if (posterUpdates[m.title]) {
            m.poster = posterUpdates[m.title];
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

    transaction(posterUpdates);
    db.close();
    console.log("Updated univibe.db");

    console.log("All updates applied successfully.");
}

applyUpdates();
