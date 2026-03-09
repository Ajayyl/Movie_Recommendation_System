const fs = require('fs');

const movieDataPath = 'd:/univibe/data/movieData.js';
const fileData = fs.readFileSync(movieDataPath, 'utf8');
const jsonMatch = fileData.match(/const MOVIES \= (\[[\s\S]*\]);/i);

if (!jsonMatch) {
    console.error('Could not match MOVIES array in movieData.js');
    process.exit(1);
}

const movies = eval(jsonMatch[1]);
const broken = [];

movies.forEach(m => {
    const poster = m.poster || '';
    if (poster === '' || poster.includes('placehold.co')) {
        broken.push(m.title + ' (movieData.js)');
    }
});

const backendPath = 'd:/univibe/backend/baseMovies.json';
if (fs.existsSync(backendPath)) {
    const backendData = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
    backendData.forEach(m => {
        const poster = m.poster || '';
        if (poster === '' || poster.includes('placehold.co')) {
            broken.push(m.title + ' (baseMovies.json)');
        }
    });
}

console.log('BROKEN_TITLES_START');
broken.forEach(t => console.log(t));
console.log('BROKEN_TITLES_END');
