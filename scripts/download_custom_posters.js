const fs = require('fs');
const https = require('https');
const http = require('http');

const urls = {
    "Top Gun: Maverick": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Top_Gun_Maverick_logo.png",
    "The Dark Knight": "https://upload.wikimedia.org/wikipedia/commons/8/8f/The_Dark_Knight_%40_IMAX.jpg",
    "WALL-E": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Wall-e_Pixar.jpg",
    "Paddington 2": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Paddington_2_-_Logo.png",
    "Coco": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Disney%27s_Coco_logo.png",
    "The Secret Life of Walter Mitty": "https://upload.wikimedia.org/wikipedia/commons/a/a3/The_Secret_Life_of_Walter_Mitty_logo.png",
    "The Grand Budapest Hotel": "https://upload.wikimedia.org/wikipedia/commons/0/05/The_Grand_Budapest_Hotel_movie_logo.png",
    "Moonlight": "https://upload.wikimedia.org/wikipedia/commons/7/72/Moonlight_Film_Logo.png",
    "The Matrix": "https://upload.wikimedia.org/wikipedia/commons/d/db/The-matrix-logo.png",
    "Inside Out": "https://upload.wikimedia.org/wikipedia/commons/0/07/Inside_Out_%282015_film%29_Logo.svg",
    "Soul": "https://upload.wikimedia.org/wikipedia/commons/7/71/Logo_Soul.png"
};

// Fix the extension for SVG if needed, but the server handles static files
// Actually, I'll try to find PNG/JPG for everything to be safe.

async function download(url, dest) {
    return new Promise((resolve) => {
        let client = url.startsWith('https') ? https : http;
        client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (UnivibeApp)' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                let loc = res.headers.location;
                if (loc.startsWith('//')) loc = 'https:' + loc;
                else if (loc.startsWith('/')) loc = new URL(url).origin + loc;
                download(loc, dest).then(resolve);
                return;
            }
            if (res.statusCode !== 200) {
                console.log('Failed:', url, '->', res.statusCode);
                resolve(false);
                return;
            }
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(true); });
        }).on('error', (e) => {
            console.error('Error downloading:', e.message);
            if (fs.existsSync(dest)) fs.unlinkSync(dest);
            resolve(false);
        });
    });
}

const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';

const movieDataFile = fs.readFileSync(movieDataPath, 'utf8');
const jsonMatch = movieDataFile.match(/const MOVIES \= (\[[\s\S]*\]);/i);
const movies = eval(jsonMatch[1]);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    for (const [title, url] of Object.entries(urls)) {
        const movie = movies.find(m => m.title === title);
        if (!movie) continue;

        const ext = url.split('.').pop().split('?')[0] || 'jpg';
        const dest = `assets/posters/movie_${movie.movie_id}.${ext}`;

        console.log(`Downloading ${title}...`);
        const success = await download(url, dest);
        if (success) {
            console.log(`Successfully downloaded ${title} to ${dest}`);
            movie.poster = `/assets/posters/movie_${movie.movie_id}.${ext}`;
        }
        await sleep(2000); // 2 second delay
    }

    // Write back to movieData.js
    let outStr = 'const MOVIES = ' + JSON.stringify(movies, null, 4) + ';\n';
    outStr += `\nif (typeof module !== 'undefined') {\n    module.exports = MOVIES;\n}\n`;
    fs.writeFileSync(movieDataPath, outStr, 'utf8');
    console.log('Updated movieData.js');

    // Sync to baseMovies.json
    if (fs.existsSync(baseMoviesPath)) {
        const baseMovies = JSON.parse(fs.readFileSync(baseMoviesPath, 'utf8'));
        baseMovies.forEach(bm => {
            const md = movies.find(m => m.title === bm.title);
            if (md) bm.poster = md.poster;
        });
        fs.writeFileSync(baseMoviesPath, JSON.stringify(baseMovies, null, 4), 'utf8');
        console.log('Updated baseMovies.json');
    }
})();
