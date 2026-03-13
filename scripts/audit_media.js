const fs = require('fs');
const path = require('path');

const rootDir = 'd:/univibe';
const movieDataPath = path.join(rootDir, 'data', 'movieData.js');
const postersDir = path.join(rootDir, 'assets', 'posters');

if (!fs.existsSync(movieDataPath)) {
    console.error('movieData.js not found!');
    process.exit(1);
}

const fileData = fs.readFileSync(movieDataPath, 'utf8');
const jsonMatch = fileData.match(/const MOVIES \= (\[[\s\S]*\]);/i);

if (!jsonMatch) {
    console.error('Could not match MOVIES array in movieData.js');
    process.exit(1);
}

let movies;
try {
    movies = eval(jsonMatch[1]);
} catch (e) {
    console.error('Error parsing MOVIES array:', e.message);
    process.exit(1);
}

const missingPosters = [];
const missingTrailers = [];

movies.forEach(movie => {
    // Check posters
    if (!movie.poster || movie.poster.trim() === '' || movie.poster.includes('placehold.co')) {
        missingPosters.push({ id: movie.movie_id, title: movie.title, reason: 'Empty or placeholder URL' });
    } else if (movie.poster.startsWith('assets/posters/') || movie.poster.startsWith('/assets/posters/')) {
        const relativePath = movie.poster.startsWith('/') ? movie.poster.substring(1) : movie.poster;
        const localPath = path.join(rootDir, relativePath);
        if (!fs.existsSync(localPath)) {
            missingPosters.push({ id: movie.movie_id, title: movie.title, reason: `Local file missing: ${movie.poster}` });
        }
    }

    // Check trailers
    if (!movie.trailer || movie.trailer.trim() === '' || movie.trailer === 'XXXXXXX' || movie.trailer === 'TBD') {
        missingTrailers.push({ id: movie.movie_id, title: movie.title, reason: 'Empty or placeholder' });
    }
});

console.log('--- MISSING/BROKEN POSTERS ---');
if (missingPosters.length === 0) {
    console.log('None found.');
} else {
    missingPosters.forEach(m => {
        console.log(`[ID ${m.id}] ${m.title} - ${m.reason}`);
    });
}

console.log('\n--- MISSING/BROKEN TRAILERS ---');
if (missingTrailers.length === 0) {
    console.log('None found.');
} else {
    missingTrailers.forEach(m => {
        console.log(`[ID ${m.id}] ${m.title} - ${m.reason}`);
    });
}

console.log(`\nSummary: Found ${missingPosters.length} missing posters and ${missingTrailers.length} missing trailers.`);
