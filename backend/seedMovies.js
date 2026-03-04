const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

console.log('🎬 Starting UniVibe Massive Movie Seeder...');

const dbPath = path.join(__dirname, 'data', 'univibe.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

console.log('1. Setting up movies table...');

db.exec(`
  DROP TABLE IF EXISTS movies_temp; -- Just in case
  CREATE TABLE IF NOT EXISTS movies (
    movie_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    experience_type TEXT,
    rating_percent INTEGER,
    popularity_score REAL,
    age_limit INTEGER,
    netflix_url TEXT DEFAULT '',
    prime_url TEXT DEFAULT '',
    year INTEGER,
    poster TEXT,
    synopsis TEXT,
    tags TEXT,
    ottPlatforms TEXT
  );
  -- Disable indices during bulk insert for speed
  DROP INDEX IF EXISTS idx_movies_age;
  DROP INDEX IF EXISTS idx_movies_pop;
`);

// Clear old if needed (or we can just append, but to get exactly 698754 we should clear)
db.exec('DELETE FROM movies');

console.log('2. Loading base movies...');
const baseMoviesArray = JSON.parse(fs.readFileSync(path.join(__dirname, 'baseMovies.json'), 'utf-8'));
const TARGET_COUNT = 698754;

const insertStmt = db.prepare(`
  INSERT INTO movies (movie_id, title, genre, experience_type, rating_percent, popularity_score, age_limit, netflix_url, prime_url, year, poster, synopsis, tags, ottPlatforms)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Helper to pick random element
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const rInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const rFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const GENRES = ["Action", "Sci-Fi", "Comedy", "Drama", "Animation", "Adventure", "Crime", "Thriller", "Horror", "Family", "Music", "Biography"];
const EXP_TYPES = ["intense", "fun", "emotional", "relaxing"];
const TAGS_POOL = ["cult", "underrated", "family-safe", "blockbuster", "indie", "classic"];
const PLATFORMS = ["Netflix", "Prime Video", "Disney+", "HBO Max", "Hulu", "Apple TV"];
const ADJ = ["The Dark", "Lost", "Final", "Forgotten", "Secret", "Silent", "Hidden", "Magical", "Last", "Infinite"];
const NOUN = ["City", "Dream", "Warrior", "Legend", "Story", "Galaxy", "Shadows", "Echoes", "King", "Journey"];

console.log(`3. Generating and inserting ${TARGET_COUNT} movies in transactions...`);

let insertedCount = 0;

const insertChunk = db.transaction((chunk) => {
    for (const m of chunk) {
        insertStmt.run(
            m.movie_id,
            m.title,
            JSON.stringify(m.genre),
            m.experience_type || '',
            m.rating_percent,
            m.popularity_score,
            m.age_limit,
            m.netflix_url || '',
            m.prime_url || '',
            m.year || 2020,
            m.poster || '',
            m.synopsis || '',
            JSON.stringify(m.tags || []),
            JSON.stringify(m.ottPlatforms || [])
        );
    }
});

let currentChunk = [];
const CHUNK_SIZE = 50000;

for (let i = 0; i < TARGET_COUNT; i++) {
    // First, use the existing 60 movies exactly as they are to preserve them
    if (i < baseMoviesArray.length) {
        currentChunk.push(baseMoviesArray[i]);
    } else {
        // Generate massive mock data
        const id = i + 1;
        const gCount = rInt(1, 3);
        const mGenre = [];
        for (let j = 0; j < gCount; j++) {
            let g = pick(GENRES);
            if (!mGenre.includes(g)) mGenre.push(g);
        }
        if (mGenre.length === 0) mGenre.push("Drama"); // failsafe

        const mTags = [];
        if (rInt(1, 100) > 70) mTags.push(pick(TAGS_POOL));
        if (rInt(1, 100) > 85) mTags.push(pick(TAGS_POOL));

        const pop = rFloat(0.1, 1.0);
        const isPopular = pop > 0.8;

        const ottList = [];
        const pCount = rInt(0, 2);
        for (let j = 0; j < pCount; j++) {
            ottList.push({ name: pick(PLATFORMS), url: "https://example.com" });
        }

        currentChunk.push({
            movie_id: id,
            title: `${pick(ADJ)} ${pick(NOUN)} ${id}`,
            genre: mGenre,
            experience_type: pick(EXP_TYPES),
            rating_percent: rInt(40, 99),
            popularity_score: parseFloat(pop),
            age_limit: pick([0, 13, 16, 18]),
            netflix_url: ottList.some(o => o.name === 'Netflix') ? "URL" : "",
            prime_url: ottList.some(o => o.name === 'Prime Video') ? "URL" : "",
            year: rInt(1980, 2026),
            poster: `https://placehold.co/600x900/${pick(['1a1a2e', '2c1a2e', '1a2e2c', '2e1a1b'])}/ffffff?text=Movie+${id}`,
            synopsis: "An artificial movie generated for load testing the ML models and discovery backend.",
            tags: [...new Set(mTags)],
            ottPlatforms: ottList
        });
    }

    insertedCount++;

    if (currentChunk.length >= CHUNK_SIZE || insertedCount === TARGET_COUNT) {
        insertChunk(currentChunk);
        console.log(`  ...inserted ${insertedCount} / ${TARGET_COUNT}`);
        currentChunk = [];
    }
}

console.log('4. Creating indices for fast querying...');
db.exec('CREATE INDEX idx_movies_pop ON movies(popularity_score DESC);');
db.exec('CREATE INDEX idx_movies_age ON movies(age_limit);');
db.exec('CREATE INDEX idx_movies_year ON movies(year DESC);');

console.log('✅ Done! Database is fully populated with massive scale data.');
