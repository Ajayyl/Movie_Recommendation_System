const fs = require('fs');
const https = require('https');

const movieDataPath = 'd:/univibe/data/movieData.js';
const content = fs.readFileSync(movieDataPath, 'utf8');
const movies = eval(content.match(/const MOVIES \= (\[[\s\S]*\]);/)[1]);

async function checkTrailerStatus(ytId) {
    return new Promise((resolve) => {
        // oEmbed is a reliable way to check if a video exists/is playable without full API
        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${ytId}&format=json`;
        
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                resolve({ ok: true });
            } else if (res.statusCode === 401) {
                resolve({ ok: false, status: 401, reason: 'Unauthorized/Restricted' });
            } else if (res.statusCode === 404) {
                resolve({ ok: false, status: 404, reason: 'Not Found/Deleted' });
            } else {
                resolve({ ok: false, status: res.statusCode, reason: 'Other/Blocked' });
            }
        }).on('error', (e) => {
            resolve({ ok: false, reason: e.message });
        });
    });
}

(async () => {
    console.log(`Auditing trailers for ${movies.length} movies...`);
    const brokenTrailers = [];

    for (const m of movies) {
        process.stdout.write('.');
        const res = await checkTrailerStatus(m.trailer);
        if (!res.ok) {
            brokenTrailers.push({ id: m.movie_id, title: m.title, trailer: m.trailer, reason: res.reason });
        }
    }

    console.log('\n\n--- BROKEN TRAILERS REPORT ---');
    if (brokenTrailers.length === 0) {
        console.log('All trailers are reachable via oEmbed!');
    } else {
        brokenTrailers.forEach(t => {
            console.log(`[ID ${t.id}] ${t.title}: ${t.reason} (https://youtu.be/${t.trailer})`);
        });
    }

    console.log(`\nSummary: Found ${brokenTrailers.length} trailers with potential playback issues.`);
})();
