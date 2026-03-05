const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'backend', 'data', 'univibe.db'));

console.log('Analyzing movies...');

const totalMovies = db.prepare('SELECT COUNT(*) as cnt FROM movies').get().cnt;
const missingTitle = db.prepare('SELECT COUNT(*) as cnt FROM movies WHERE title IS NULL OR title = \'\'').get().cnt;
const missingPoster = db.prepare('SELECT COUNT(*) as cnt FROM movies WHERE poster IS NULL OR poster = \'\'').get().cnt;
const missingSynopsis = db.prepare('SELECT COUNT(*) as cnt FROM movies WHERE synopsis IS NULL OR synopsis = \'\'').get().cnt;
const missingGenre = db.prepare('SELECT COUNT(*) as cnt FROM movies WHERE genre IS NULL OR genre = \'[]\' OR genre = \'\'').get().cnt;

console.log(`Total Movies: ${totalMovies}`);
console.log(`Missing Title: ${missingTitle}`);
console.log(`Missing Poster: ${missingPoster}`);
console.log(`Missing Synopsis: ${missingSynopsis}`);
console.log(`Missing Genre: ${missingGenre}`);

const sampleMissingPoster = db.prepare('SELECT * FROM movies WHERE poster IS NULL OR poster = \'\' LIMIT 3').all();
console.log('Sample missing poster:', sampleMissingPoster);

const sampleMissingTitle = db.prepare('SELECT * FROM movies WHERE title IS NULL OR title = \'\' LIMIT 3').all();
console.log('Sample missing title:', sampleMissingTitle);

db.close();
