const fs = require('fs');
const https = require('https');
const http = require('http');
const url = require('url');

const movieDataPath = 'd:/univibe/data/movieData.js';
const content = fs.readFileSync(movieDataPath, 'utf8');
const movies = eval(content.match(/const MOVIES \= (\[[\s\S]*\]);/)[1]);

async function checkMedia(uri, isImage = true) {
    if (!uri || uri.trim() === '') return { ok: false, reason: 'Empty' };

    // Local
    if (!uri.startsWith('http')) {
        let cleanPath = uri.startsWith('/') ? uri.slice(1) : uri;
        let fullPath = 'd:/univibe/' + cleanPath;
        if (!fs.existsSync(fullPath)) return { ok: false, reason: 'File not found' };
        if (isImage) {
            const stats = fs.statSync(fullPath);
            if (stats.size === 1957) return { ok: false, reason: 'Placeholder file (1957 bytes)' };
        }
        return { ok: true };
    }

    // Remote
    return new Promise((resolve) => {
        function attempt(currentUrl, depth = 0) {
            if (depth > 5) return resolve({ ok: false, reason: 'Too many redirects' });
            
            const client = currentUrl.startsWith('https') ? https : http;
            const req = client.get(currentUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve({ ok: true });
                } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    let nextUrl = res.headers.location;
                    if (!nextUrl.startsWith('http')) {
                        const parsed = new URL(currentUrl);
                        nextUrl = parsed.origin + nextUrl;
                    }
                    attempt(nextUrl, depth + 1);
                } else {
                    resolve({ ok: false, reason: `Status ${res.statusCode}` });
                }
            }).on('error', (e) => {
                resolve({ ok: false, reason: `Network error: ${e.message}` });
            });
            req.setTimeout(5000, () => { req.abort(); resolve({ ok: false, reason: 'Timeout' }); });
        }
        attempt(uri);
    });
}

(async () => {
    const brokenPosters = [];
    const missingTrailers = [];

    console.log(`Auditing ${movies.length} movies...`);
    for (const m of movies) {
        process.stdout.write('.');
        const posterRes = await checkMedia(m.poster);
        if (!posterRes.ok) {
            brokenPosters.push({ id: m.movie_id, title: m.title, poster: m.poster, reason: posterRes.reason });
        }
        // Basic trailer check (missing or too short)
        if (!m.trailer || m.trailer.trim().length < 5) {
            missingTrailers.push({ id: m.movie_id, title: m.title });
        }
    }

    console.log('\n\n--- BROKEN POSTERS ---');
    brokenPosters.forEach(p => console.log(`[${p.id}] ${p.title}: ${p.reason} (${p.poster})`));

    console.log('\n--- MISSING TRAILERS ---');
    missingTrailers.forEach(t => console.log(`[${t.id}] ${t.title}`));

    console.log(`\nSummary: ${brokenPosters.length} broken posters, ${missingTrailers.length} missing trailers.`);
})();
