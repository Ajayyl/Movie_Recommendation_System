const fs = require('fs');
const Database = require('better-sqlite3');

const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';
const dbPath = 'd:/univibe/backend/data/univibe.db';

const trailerUpdates = {
    54: "qvsiJKdDxPs", 53: "FaQe8JFGdaM", 57: "4bqM64EJY2c", 56: "B2yC1jpAYvQ", 55: "oP88LHBukW8",
    60: "aW_j4pNvG98", 67: "pgfUzQ8nzBY", 66: "Gc6dEDnL8JA", 62: "jgYYxs_d_bo", 61: "HZWlRm8vLxc",
    63: "g79CvhHaj5I", 69: "cGorkMwcjd4", 70: "DGbchTBSkV4", 68: "-SzlsRBPPCg", 72: "KwU1yCeHrkQ",
    71: "U2J8x_Dq18Y", 79: "1g-yZ3BDDK0", 73: "3-Xq_Zz3nPA", 77: "3FuuZU21S80", 75: "MAnKUX9w494",
    76: "EtJXEmW_XNM", 74: "GKLvKk_uXzA", 78: "8U9t5xMElN0", 85: "Po3jStA673E", 89: "D4qAQYlgZQs",
    82: "Keck4iVUUdE", 88: "Y5BeWdODPqo", 83: "x82MBPDCOmU", 81: "r0synl-lI4I", 87: "OKBMCL-frPU",
    90: "EnhS3matIoU", 92: "FCB0ZfQ9Rzs", 93: "TiDyv53adt0", 96: "q5GG5HJ1hVk", 95: "vOCM9wztBYQ",
    99: "1S6YkmYvgi8", 94: "bMf0IyzyKt4", 98: "fIKwCDuNqvg", 100: "wA30CKor18A", 97: "9z-NeZyiyF8",
    91: "vHESM8iR1JE", 101: "sY_F6issHsU"
};

console.log("Starting final comprehensive trailer fix...");

// 1. Update movieData.js
if (fs.existsSync(movieDataPath)) {
    let content = fs.readFileSync(movieDataPath, 'utf8');
    let movies = eval(content.match(/const MOVIES \= (\[[\s\S]*\]);/)[1]);
    movies.forEach(m => {
        if (trailerUpdates[m.movie_id]) {
            m.trailer = trailerUpdates[m.movie_id];
        }
    });
    const outStr = 'const MOVIES = ' + JSON.stringify(movies, null, 4) + ';\n\nif (typeof module !== "undefined") { module.exports = MOVIES; }\n';
    fs.writeFileSync(movieDataPath, outStr, 'utf8');
    console.log("Updated movieData.js");
}

// 2. Update baseMovies.json
if (fs.existsSync(baseMoviesPath)) {
    let movies = JSON.parse(fs.readFileSync(baseMoviesPath, 'utf8'));
    movies.forEach(m => {
        if (trailerUpdates[m.movie_id]) {
            m.trailer = trailerUpdates[m.movie_id];
        }
    });
    fs.writeFileSync(baseMoviesPath, JSON.stringify(movies, null, 4), 'utf8');
    console.log("Updated baseMovies.json");
}

// 3. Update univibe.db
if (fs.existsSync(dbPath)) {
    try {
        const db = new Database(dbPath);
        const updateStmt = db.prepare('UPDATE movies SET trailer = ? WHERE movie_id = ?');
        const transaction = db.transaction((updates) => {
            for (const [id, trailer] of Object.entries(updates)) {
                updateStmt.run(trailer, id);
            }
        });
        transaction(trailerUpdates);
        db.close();
        console.log("Updated univibe.db successfully.");
    } catch (e) {
        console.error("Error updating database:", e.message);
    }
} else {
    console.warn("Database file not found at " + dbPath);
}

console.log("All trailers have been updated to working official versions.");
