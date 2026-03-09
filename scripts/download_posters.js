const fs = require('fs');
const https = require('https');
const http = require('http');

const fileData = fs.readFileSync('data/movieData.js', 'utf8');
const jsonMatch = fileData.match(/const MOVIES \= (\[[\s\S]*\]);/i);
if (!jsonMatch) { console.error('No MOVIES match'); process.exit(1); }
let movies = eval(jsonMatch[1]);

if (!fs.existsSync('assets')) fs.mkdirSync('assets');
if (!fs.existsSync('assets/posters')) fs.mkdirSync('assets/posters');

// Titles that were struggling
const titles = ['Top Gun: Maverick', 'Knives Out', 'Spider-Man: Into the Spider-Verse', 'The Dark Knight', 'Goodfellas', 'WALL-E', 'Paddington 2', 'Moonlight', 'Coco'];

async function download(url, dest) {
    return new Promise((resolve) => {
        let client = url.startsWith('https') ? https : http;
        const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) UnivibeApp/1.0' } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
                if (res.headers.location.startsWith('//')) {
                    download('https:' + res.headers.location, dest).then(resolve);
                } else if (res.headers.location.startsWith('/')) {
                    const domain = new URL(url).origin;
                    download(domain + res.headers.location, dest).then(resolve);
                } else {
                    download(res.headers.location, dest).then(resolve);
                }
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
        }).on('error', (e) => { console.log('Error', url, e.message); fs.unlink(dest, () => { }); resolve(false); });
    });
}

// Just map working wikipedia URLs for these ones
const wikiMaps = {
    'Top Gun: Maverick': 'https://upload.wikimedia.org/wikipedia/en/1/13/Top_Gun_Maverick_Poster.jpg',
    'Knives Out': 'https://upload.wikimedia.org/wikipedia/en/1/1f/Knives_Out_poster.jpeg',
    'Spider-Man: Into the Spider-Verse': 'https://upload.wikimedia.org/wikipedia/en/f/fa/Spider-Man_Into_the_Spider-Verse_poster.png',
    'The Dark Knight': 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg',
    'Goodfellas': 'https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg',
    'WALL-E': 'https://upload.wikimedia.org/wikipedia/en/c/c2/WALL-E_poster.jpg',
    'Paddington 2': 'https://upload.wikimedia.org/wikipedia/en/e/e4/Paddington_2_poster.jpg',
    'Moonlight': 'https://upload.wikimedia.org/wikipedia/en/8/84/Moonlight_%282016_film%29_poster.jpg',
    'Coco': 'https://upload.wikimedia.org/wikipedia/en/9/98/Coco_%282017_film%29_poster.jpg'
};

async function run() {
    for (let m of movies) {
        if (wikiMaps[m.title]) {
            console.log('Downloading poster for:', m.title);
            const urlToFetch = wikiMaps[m.title];
            const dest = `assets/posters/movie_${m.movie_id}.jpg`;
            const success = await download(urlToFetch, dest);
            if (success) {
                console.log('Downloaded', m.title);
                m.poster = `/${dest}`; // e.g. /assets/posters/movie_45.jpg
            } else {
                console.log('Failed to download', m.title);
            }
        }
    }

    const out = 'const MOVIES = ' + JSON.stringify(movies, null, 4) + ';\n\nif (typeof module !== \'undefined\') {\n    module.exports = MOVIES;\n}\n';
    fs.writeFileSync('data/movieData.js', out, 'utf8');

    // also sync backend
    const backendPath = 'backend/baseMovies.json';
    if (fs.existsSync(backendPath)) {
        let data = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
        data.forEach(m => {
            const fixed = movies.find(x => x.title === m.title && wikiMaps[x.title]);
            if (fixed) m.poster = fixed.poster;
        });
        fs.writeFileSync(backendPath, JSON.stringify(data, null, 4), 'utf8');
    }

    console.log('Finished downloading and updating data');
}

run();
