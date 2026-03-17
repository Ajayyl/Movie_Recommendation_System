const https = require('https');
const MOVIES = require('d:/univibe/data/movieData.js');

async function checkUrl(url) {
    if (!url) return { status: 'EMPTY' };
    return new Promise((resolve) => {
        const options = {
            method: 'HEAD',
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 5000
        };
        const req = https.request(url, options, (res) => {
            resolve({ url, status: res.statusCode });
        });
        req.on('error', (e) => resolve({ url, status: 'ERROR', error: e.message }));
        req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT' }); });
        req.end();
    });
}

async function runAudit() {
    console.log(`Auditing all links for ${MOVIES.length} movies...`);
    const broken = [];
    const batchSize = 10;
    
    for (let i = 0; i < MOVIES.length; i += batchSize) {
        const batch = MOVIES.slice(i, i + batchSize);
        const tasks = [];
        
        batch.forEach(m => {
            if (m.poster) tasks.push(checkUrl(m.poster).then(res => ({ ...res, title: m.title, type: 'Poster', id: m.movie_id })));
            if (m.netflix_url) tasks.push(checkUrl(m.netflix_url).then(res => ({ ...res, title: m.title, type: 'Netflix', id: m.movie_id })));
            if (m.prime_url) tasks.push(checkUrl(m.prime_url).then(res => ({ ...res, title: m.title, type: 'Prime', id: m.movie_id })));
            m.ottPlatforms.forEach(p => {
                tasks.push(checkUrl(p.url).then(res => ({ ...res, title: m.title, type: `Platform:${p.name}`, id: m.movie_id })));
            });
        });
        
        const results = await Promise.all(tasks);
        results.forEach(r => {
            if (![200, 301, 302, 303, 307, 308].includes(r.status)) broken.push(r);
        });
        process.stdout.write('.');
    }
    
    console.log('\n\n--- COMPREHENSIVE LINK AUDIT ---');
    if (broken.length === 0) {
        console.log('All links are valid!');
    } else {
        broken.forEach(b => console.log(`[ID ${b.id}] ${b.title}: [${b.type}] ${b.status} - ${b.url}`));
    }
    console.log(`\nSummary: Found ${broken.length} broken links.`);
}

runAudit();
