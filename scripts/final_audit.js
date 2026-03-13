const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const rootDir = 'd:/univibe';
const movieDataPath = path.join(rootDir, 'data', 'movieData.js');

const fileData = fs.readFileSync(movieDataPath, 'utf8');
const jsonMatch = fileData.match(/const MOVIES \= (\[[\s\S]*\]);/i);
const movies = eval(jsonMatch[1]);

async function checkUrl(url) {
    if (!url) return false;
    if (url.startsWith('assets/') || url.startsWith('/assets/')) {
        let relativePath = url.startsWith('/') ? url.substring(1) : url;
        const localPath = path.join(rootDir, relativePath);
        if (!fs.existsSync(localPath)) return false;
        // Check for 1957 byte placeholders
        const stats = fs.statSync(localPath);
        if (stats.size === 1957) return false;
        return true;
    }
    if (url.startsWith('http')) {
        return new Promise((resolve) => {
            const client = url.startsWith('https') ? https : http;
            client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
                resolve(res.statusCode >= 200 && res.statusCode < 400);
            }).on('error', () => resolve(false));
        });
    }
    return false;
}

(async () => {
    const brokenPosters = [];
    const missingTrailers = [];

    console.log(`Checking ${movies.length} movies...`);

    for (const m of movies) {
        process.stdout.write('.');
        const posterOk = await checkUrl(m.poster);
        if (!posterOk) {
            brokenPosters.push({ id: m.movie_id, title: m.title, poster: m.poster || 'NONE' });
        }
        if (!m.trailer || m.trailer.trim() === '' || m.trailer.length < 5) {
            missingTrailers.push({ id: m.movie_id, title: m.title });
        }
    }

    console.log('\n\n--- RESULTS ---');
    console.log('BROKEN/MISSING IMAGES:');
    if (brokenPosters.length === 0) console.log('None.');
    else brokenPosters.forEach(p => console.log(`- [${p.id}] ${p.title} (${p.poster})`));

    console.log('\nMISSING TRAILERS:');
    if (missingTrailers.length === 0) console.log('None.');
    else missingTrailers.forEach(t => console.log(`- [${t.id}] ${t.title}`));
})();
