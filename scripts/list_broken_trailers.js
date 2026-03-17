const fs = require('fs');

async function checkTrailerStatus(ytId) {
    if (!ytId || ytId.length < 5) return { ok: false, reason: 'Empty ID' };
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${ytId}&format=json`;
    try {
        const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
        return { ok: res.ok, status: res.status };
    } catch (e) {
        return { ok: false, reason: 'Network/Timeout' };
    }
}

(async () => {
    const movieDataPath = 'd:/univibe/data/movieData.js';
    const content = fs.readFileSync(movieDataPath, 'utf8');
    const movies = eval(content.match(/const MOVIES \= (\[[\s\S]*\]);/)[1]);
    
    console.log('Auditing trailers...');
    const broken = [];
    
    // Check in parallel batches
    const batchSize = 10;
    for (let i = 0; i < movies.length; i += batchSize) {
        const batch = movies.slice(i, i + batchSize);
        await Promise.all(batch.map(async (m) => {
            const res = await checkTrailerStatus(m.trailer);
            if (!res.ok) {
                broken.push({ id: m.movie_id, title: m.title, trailer: m.trailer, reason: res.reason || res.status });
            }
        }));
    }
    
    console.log('\n--- BROKEN TRAILERS ---');
    broken.forEach(b => console.log(`${b.id}|${b.title}|${b.trailer}|${b.reason}`));
    console.log(`\nTotal broken: ${broken.length}`);
})();
