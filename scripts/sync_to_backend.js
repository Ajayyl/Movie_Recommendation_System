const fs = require('fs');
const path = require('path');

// Re-read movieData.js manually to avoid require cache or environment issues
const movieDataPath = path.join(__dirname, '..', 'data', 'movieData.js');
const content = fs.readFileSync(movieDataPath, 'utf8');
const jsonMatch = content.match(/const MOVIES \= (\[[\s\S]*\]);/i);
if (!jsonMatch) {
    console.error('Could not find MOVIES array in movieData.js');
    process.exit(1);
}

// Safely evaluate or parse. Since it's our own file, we can eval part of it or use a safer approach for JSON.
// Better: the user just updated it, so let's use a regex-based extraction if possible, 
// but since it's a JS file with potentially unquoted keys in the source (though I wrote them as JSON),
// we can use a temporary file to convert to pure JSON.

// Actually, I can just use a simple Node script to require and stringify.
const movies = require(movieDataPath);

const baseMoviesPath = path.join(__dirname, '..', 'backend', 'baseMovies.json');

// Ensure all movies have the fields required by the backend/ML pipeline
const processedMovies = movies.map(m => ({
    ...m,
    overview: m.overview || m.synopsis // Ensure overview exists for ML
}));

fs.writeFileSync(baseMoviesPath, JSON.stringify(processedMovies, null, 4), 'utf8');
console.log(`Successfully synced ${processedMovies.length} movies to ${baseMoviesPath}`);
