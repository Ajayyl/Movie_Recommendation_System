const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const movieDataPath = 'd:/univibe/data/movieData.js';
const fileData = fs.readFileSync(movieDataPath, 'utf8');
const jsonMatch = fileData.match(/const MOVIES \= (\[[\s\S]*\]);/i);

if (!jsonMatch) {
    console.error('Could not match MOVIES array in movieData.js');
    process.exit(1);
}

const movies = eval(jsonMatch[1]);
const broken = [];

async function checkUrl(url) {
    if (url.startsWith('/assets/')) {
        const localPath = path.join('d:/univibe', url);
        if (!fs.existsSync(localPath)) {
            return false;
        }
        return true;
    }

    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).on('error', () => {
            resolve(false);
        });

        req.setTimeout(5000, () => {
            req.abort();
            resolve(false);
        });
    });
}

(async () => {
    console.log('Checking ' + movies.length + ' movies...');
    let failCount = 0;
    for (const m of movies) {
        process.stdout.write('.');
        const poster = m.poster || '';
        if (poster === '' || poster.includes('placehold.co')) {
            broken.push({ id: m.movie_id, title: m.title, poster: poster });
            failCount++;
            continue;
        }

        const isOk = await checkUrl(poster);
        if (!isOk) {
            broken.push({ id: m.movie_id, title: m.title, poster: poster });
            failCount++;
        }
    }
    console.log('\n\n--- BROKEN MOVIES ---');
    broken.forEach(b => console.log(`ID: ${b.id} | Title: ${b.title} | URL: ${b.poster}`));
    console.log(`\nTotal broken: ${failCount}`);
})();
