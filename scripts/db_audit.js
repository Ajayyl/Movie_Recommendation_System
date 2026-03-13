const Database = require('better-sqlite3');
const db = new Database('d:/univibe/backend/data/univibe.db');

const total = db.prepare('SELECT COUNT(*) as cnt FROM movies').get().cnt;
const missingPoster = db.prepare("SELECT COUNT(*) as cnt FROM movies WHERE poster IS NULL OR poster = ''").get().cnt;
const missingTrailer = db.prepare("SELECT COUNT(*) as cnt FROM movies WHERE trailer IS NULL OR trailer = ''").get().cnt;

console.log(`Total Movies in DB: ${total}`);
console.log(`Missing Poster: ${missingPoster}`);
console.log(`Missing Trailer: ${missingTrailer}`);

const samples = db.prepare("SELECT movie_id, title, poster, trailer FROM movies WHERE (poster IS NULL OR poster = '') OR (trailer IS NULL OR trailer = '') LIMIT 20").all();
console.log('\n--- SAMPLES OF BROKEN MOVIES (DB) ---');
samples.forEach(s => {
    console.log(`[ID ${s.movie_id}] ${s.title} | Poster: ${s.poster || 'MISSING'} | Trailer: ${s.trailer || 'MISSING'}`);
});

db.close();
