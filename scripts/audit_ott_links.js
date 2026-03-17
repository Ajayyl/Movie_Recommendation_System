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

(async () => {
    console.log(`Auditing OTT links for ${MOVIES.length} movies...`);
    const broken = [];
    
    for (const m of MOVIES) {
        process.stdout.write('.');
        const urlsToCheck = [];
        if (m.netflix_url) urlsToCheck.push({ type: 'Netflix Top', url: m.netflix_url });
        if (m.prime_url) urlsToCheck.push({ type: 'Prime Top', url: m.prime_url });
        m.ottPlatforms.forEach(p => {
            urlsToCheck.push({ type: `Platform:${p.name}`, url: p.url });
        });
        
        for (const item of urlsToCheck) {
            const res = await checkUrl(item.url);
            if (![200, 301, 302, 303, 307, 308].includes(res.status)) {
                broken.push({ id: m.movie_id, title: m.title, ...item, ...res });
            }
        }
    }
    
    console.log('\n\n--- BROKEN OTT LINKS REPORT ---');
    if (broken.length === 0) {
        console.log('All OTT links are reachable!');
    } else {
        broken.forEach(b => {
            console.log(`[ID ${b.id}] ${b.title}: [${b.type}] ${b.status} - ${b.url}`);
        });
    }
    console.log(`\nSummary: Found ${broken.length} broken/suspicious OTT links.`);
})();
