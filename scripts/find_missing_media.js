const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const rootDir = 'd:/univibe';
const movieDataPath = path.join(rootDir, 'data', 'movieData.js');

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

const brokenPosters = [];
const missingTrailers = [];

async function checkUrl(url) {
    if (!url || url.includes('placehold.co')) return false;

    // Local assets
    if (!url.startsWith('http')) {
        let relativePath = url;
        if (relativePath.startsWith('/')) relativePath = relativePath.substring(1);
        const localPath = path.join(rootDir, relativePath);
        return fs.existsSync(localPath);
    }

    // Remote assets
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
    console.log(`Auditing ${movies.length} movies...`);

    for (const m of movies) {
        process.stdout.write('.');
        
        // Audit Poster
        const posterOk = await checkUrl(m.poster);
        if (!posterOk) {
            brokenPosters.push({ id: m.movie_id, title: m.title, poster: m.poster || 'EMPTY' });
        }

        // Audit Trailer
        if (!m.trailer || m.trailer.trim() === '' || m.trailer === 'XXXXXXX' || m.trailer === 'TBD') {
            missingTrailers.push({ id: m.movie_id, title: m.title });
        }
    }

    console.log('\n\n--- MISSING/BROKEN IMAGES ---');
    if (brokenPosters.length === 0) {
        console.log('None found!');
    } else {
        brokenPosters.forEach(b => {
            console.log(`[ID ${b.id}] ${b.title} - URL: ${b.poster}`);
        });
    }

    console.log('\n--- MISSING/BROKEN TRAILERS ---');
    if (missingTrailers.length === 0) {
        console.log('None found!');
    } else {
        missingTrailers.forEach(b => {
            console.log(`[ID ${b.id}] ${b.title}`);
        });
    }

    console.log(`\nSummary: Found ${brokenPosters.length} broken posters and ${missingTrailers.length} missing trailers.`);
})();
