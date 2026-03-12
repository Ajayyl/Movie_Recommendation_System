const fs = require('fs');
const MOVIES = require('d:/univibe/data/movieData.js');

const fileNames = {
    'Inception': 'Inception_Poster.jpg',
    'Blade Runner 2049': 'Blade_Runner_2049_poster.jpg',
    'The Matrix': 'The_Matrix_Poster.jpg',
    'Joker': 'Joker_(2019_film)_poster.jpg',
    'The Dark Knight': 'The_Dark_Knight_(2008_film).jpg',
    'Parasite': 'Parasite_(2019_film).png'
};

const updatedMovies = MOVIES.map(m => {
    if (m.poster.includes('http') && fileNames[m.title]) {
        m.poster = `https://en.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(fileNames[m.title])}`;
    }
    return m;
});

const out = 'const MOVIES = ' + JSON.stringify(updatedMovies, null, 4) + ';\n\nif (typeof module !== \'undefined\') {\n    module.exports = MOVIES;\n}\n';
fs.writeFileSync('d:/univibe/data/movieData.js', out, 'utf8');
console.log('Fixed remaining remote links using Special:FilePath redirects.');
