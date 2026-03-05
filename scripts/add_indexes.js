const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'backend', 'data', 'univibe.db'));

console.log('Adding composite index...');
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_age_pop ON movies(age_limit, popularity_score DESC);
`);
console.log('Indexes added successfully.');
db.close();
