const MOVIES = require('d:/univibe/data/movieData.js');

const missing = {
    noPoster: [],
    noTrailer: [],
    noQuote: []
};

MOVIES.forEach(m => {
    if (!m.poster || m.poster.startsWith('/assets/') || m.poster === '') {
        // We just updated these to wikimedia, but maybe some were missed in the map
        missing.noPoster.push({ id: m.movie_id, title: m.title });
    }
    if (!m.trailer || m.trailer === '') {
        missing.noTrailer.push({ id: m.movie_id, title: m.title });
    }
    if (!m.quote || m.quote === '') {
        missing.noQuote.push({ id: m.movie_id, title: m.title });
    }
});

console.log('--- DATA AUDIT ---');
console.log(JSON.stringify(missing, null, 2));
