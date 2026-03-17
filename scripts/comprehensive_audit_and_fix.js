const fs = require('fs');

const API_KEY = '15d2ea6d0dc1d476efbca3eba2428bab';
const movieDataPath = 'd:/univibe/data/movieData.js';
const backendPath = 'd:/univibe/backend/baseMovies.json';

async function checkUrl(uri) {
    if (!uri || typeof uri !== 'string' || uri.trim() === '') return { ok: false, reason: 'Empty' };
    if (!uri.startsWith('http')) {
        let cleanPath = uri.startsWith('/') ? uri.slice(1) : uri;
        if (!fs.existsSync('d:/univibe/' + cleanPath)) return { ok: false, reason: 'Local missing' };
        return { ok: true };
    }
    try {
        const res = await fetch(uri, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
        return { ok: res.ok, reason: res.status };
    } catch (e) {
        return { ok: false, reason: e.name === 'TimeoutError' ? 'Timeout' : e.message };
    }
}

async function checkTrailerStatus(ytId) {
    if (!ytId || ytId.length < 5) return { ok: false, reason: 'Empty ID' };
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${ytId}&format=json`;
    try {
        const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
        return { ok: res.ok, reason: res.status };
    } catch (e) {
        return { ok: false, reason: 'Error' };
    }
}

async function getTMDBData(title, year) {
    let clean = title.replace(/\s*\(\d{4}\)\s*/, '').split(' - ')[0].split(': ')[0].trim();
    const urls = [
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(clean)}&primary_release_year=${year}`,
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(clean)}`
    ];

    for (const url of urls) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.results && data.results.length > 0) {
                const movie = data.results[0];
                // Get videos
                const vRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`);
                const vData = await vRes.json();
                let video = vData.results.find(v => v.site === 'YouTube' && v.type === 'Trailer');
                if (!video) video = vData.results.find(v => v.site === 'YouTube');
                
                return {
                    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` : null,
                    trailer: video ? video.key : null
                };
            }
        } catch (e) {}
    }
    return null;
}

(async () => {
    console.log('--- FINAL MOVIE AUDIT & FIX ---');
    const content = fs.readFileSync(movieDataPath, 'utf8');
    const movies = eval(content.match(/const MOVIES \= (\[[\s\S]*\]);/)[1]);
    
    let fixedCount = 0;
    const report = [];

    const chunkSize = 10;
    for (let i = 0; i < movies.length; i += chunkSize) {
        const chunk = movies.slice(i, i + chunkSize);
        console.log(`Auditing movies ${i+1} to ${Math.min(i+chunkSize, movies.length)}...`);
        
        await Promise.all(chunk.map(async (m) => {
            const pRes = await checkUrl(m.poster);
            const tRes = await checkTrailerStatus(m.trailer);
            
            if (!pRes.ok || !tRes.ok) {
                console.log(`  Issue with "${m.title}": ${!pRes.ok ? 'Poster' : ''} ${!tRes.ok ? 'Trailer' : ''}`);
                const fix = await getTMDBData(m.title, m.year);
                if (fix) {
                    let changed = false;
                    if (!pRes.ok && fix.poster) { m.poster = fix.poster; changed = true; }
                    if (!tRes.ok && fix.trailer) { m.trailer = fix.trailer; changed = true; }
                    if (changed) {
                        fixedCount++;
                        report.push(`FIXED: ${m.title}`);
                    } else {
                        report.push(`FAILED FIX: ${m.title} (TMDB had no better data)`);
                    }
                } else {
                    report.push(`NOT FOUND: ${m.title} on TMDB`);
                }
            }
        }));
    }

    if (fixedCount > 0) {
        console.log(`\nFixed ${fixedCount} movies. Updating files...`);
        const outStr = `const MOVIES = ${JSON.stringify(movies, null, 4)};\n\nif (typeof module !== 'undefined') { module.exports = MOVIES; }\n`;
        fs.writeFileSync(movieDataPath, outStr, 'utf8');
        
        if (fs.existsSync(backendPath)) {
            const bData = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
            bData.forEach(bm => {
                const up = movies.find(um => um.movie_id === bm.movie_id);
                if (up) { bm.poster = up.poster; bm.trailer = up.trailer; }
            });
            fs.writeFileSync(backendPath, JSON.stringify(bData, null, 4), 'utf8');
        }
    }

    console.log('\n--- FINAL REPORT ---');
    report.forEach(line => console.log(line));
    console.log(`\nSummary: ${movies.length} checked, ${fixedCount} fixed.`);
})();
