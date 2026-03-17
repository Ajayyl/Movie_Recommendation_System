const https = require('https');
const MOVIES = require('d:/univibe/data/movieData.js');

async function checkUrl(url) {
    return new Promise((resolve) => {
        const options = {
            method: 'HEAD',
            headers: {
                'User-Agent': 'Mozilla/5.0'
            },
            timeout: 5000
        };
        const req = https.request(url, options, (res) => {
            resolve({ url, status: res.statusCode });
        });
        req.on('error', (e) => resolve({ url, status: 'ERROR', error: e.message }));
        req.on('timeout', () => {
            req.destroy();
            resolve({ url, status: 'TIMEOUT' });
        });
        req.end();
    });
}

async function runAudit() {
    console.log(`Auditing ${MOVIES.length} poster links...`);
    
    // Check in batches of 10
    const results = [];
    const batchSize = 10;
    
    for (let i = 0; i < MOVIES.length; i += batchSize) {
        const batch = MOVIES.slice(i, i + batchSize);
        const promises = batch.map(m => checkUrl(m.poster).then(res => ({ id: m.movie_id, title: m.title, ...res })));
        const batchResults = await Promise.all(promises);
        results.push(...batchResults);
        process.stdout.write('.');
    }
    
    console.log('\n\n--- POSTER LINK AUDIT ---');
    const broken = results.filter(r => r.status !== 200);
    const ok = results.filter(r => r.status === 200);
    
    console.log(`Total OK: ${ok.length}`);
    console.log(`Total BROKEN: ${broken.length}`);
    
    if (broken.length > 0) {
        console.log('\nBroken Links:');
        broken.forEach(b => console.log(`[ID ${b.id}] ${b.title}: ${b.status} - ${b.url}`));
    } else {
        console.log('\nAll posters are reachable (HTTP 200)!');
    }
}

runAudit();
