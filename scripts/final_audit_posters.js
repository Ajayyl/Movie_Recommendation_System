const https = require('https');
const MOVIES = require('d:/univibe/data/movieData.js');

async function checkUrl(url, timeout = 10000) {
    if (!url) return 0;
    return new Promise((resolve) => {
        const options = {
            method: 'HEAD',
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout
        };
        const req = https.request(url, options, (res) => {
            resolve(res.statusCode);
        });
        req.on('error', (e) => resolve(500));
        req.on('timeout', () => {
            req.destroy();
            resolve(408);
        });
        req.end();
    });
}

async function runAudit() {
    console.log(`Auditing all ${MOVIES.length} posters...`);
    const broken = [];
    
    // Process in parallel with moderate concurrency
    const batchSize = 10;
    for (let i = 0; i < MOVIES.length; i += batchSize) {
        const batch = MOVIES.slice(i, i + batchSize);
        const promises = batch.map(async m => {
            const status = await checkUrl(m.poster);
            if (status !== 200) {
                return { id: m.movie_id, title: m.title, status, url: m.poster };
            }
            return null;
        });
        
        const results = await Promise.all(promises);
        results.forEach(r => { if (r) broken.push(r); });
        process.stdout.write('.');
    }
    
    console.log('\n\n--- BROKEN POSTERS REPORT ---');
    if (broken.length === 0) {
        console.log('CONGRATS: All posters are return 200 OK!');
    } else {
        broken.forEach(b => {
            console.log(`[ID ${b.id}] ${b.title}: ${b.status} - ${b.url}`);
        });
        console.log(`\nFound ${broken.length} broken poster links.`);
    }
}

runAudit();
