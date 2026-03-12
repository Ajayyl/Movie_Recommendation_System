const https = require('https');
const MOVIES = require('d:/univibe/data/movieData.js');

const checkUrl = (url) => {
    return new Promise((resolve) => {
        const options = {
            method: 'HEAD',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };
        const req = https.request(url, options, (res) => {
            resolve({ url, status: res.statusCode });
        });
        req.on('error', (e) => {
            resolve({ url, status: 'ERROR', error: e.message });
        });
        req.end();
    });
};

async function checkAll() {
    const results = [];
    for (const movie of MOVIES) {
        if (movie.poster && movie.poster.includes('http')) {
            const res = await checkUrl(movie.poster);
            if (res.status !== 200) {
                results.push({ id: movie.movie_id, title: movie.title, ...res });
            }
        }
    }
    console.log('--- BROKEN REMOTE LINKS ---');
    console.log(JSON.stringify(results, null, 2));
}

checkAll();
