const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'backend', 'data', 'univibe.db'));

console.log('Analyzing movies for bad strings/undefined...');

const undefinedTitle = db.prepare('SELECT COUNT(*) as cnt FROM movies WHERE title LIKE \'%undefined%\' OR title IS NULL').get().cnt;
const undefinedPoster = db.prepare('SELECT COUNT(*) as cnt FROM movies WHERE poster LIKE \'%undefined%\' OR poster IS NULL').get().cnt;
const badPoster = db.prepare('SELECT COUNT(*) as cnt FROM movies WHERE poster NOT LIKE \'http%\' AND poster != \'\'').get().cnt;
const badGenre = db.prepare('SELECT COUNT(*) as cnt FROM movies WHERE genre = \'[]\' OR genre LIKE \'%undefined%\'').get().cnt;

console.log(`Undefined/Bad Title: ${undefinedTitle}`);
console.log(`Undefined Poster: ${undefinedPoster}`);
console.log(`Bad URL Poster: ${badPoster}`);
console.log(`Bad Genre: ${badGenre}`);

const sampleBadPoster = db.prepare('SELECT movie_id, title, poster FROM movies WHERE poster NOT LIKE \'http%\' AND poster != \'\' LIMIT 5').all();
console.log('Sample bad poster:', sampleBadPoster);

const sampleUndefinedPoster = db.prepare('SELECT movie_id, title, poster FROM movies WHERE poster LIKE \'%undefined%\' LIMIT 5').all();
console.log('Sample undefined poster:', sampleUndefinedPoster);

db.close();
