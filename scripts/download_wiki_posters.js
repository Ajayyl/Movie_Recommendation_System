const fs = require('fs');
const https = require('https');
const http = require('http');

const fileData = fs.readFileSync('data/movieData.js', 'utf8');
const jsonMatch = fileData.match(/const MOVIES \= (\[[\s\S]*\]);/i);
let movies = eval(jsonMatch[1]);

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
        }).on('error', (e) => { fs.unlink(dest, () => { }); resolve(false); });
    });
}

const fileNames = {
    'Top Gun: Maverick': 'Top_Gun_Maverick_Poster.jpg',
    'Knives Out': 'Knives_Out_poster.jpeg',
    'Spider-Man: Into the Spider-Verse': 'Spider-Man_Into_the_Spider-Verse_poster.png',
    'The Dark Knight': 'The_Dark_Knight_(2008_film).jpg',
    'Goodfellas': 'Goodfellas.jpg',
    'WALL-E': 'WALL-E_poster.jpg',
    'Paddington 2': 'Paddington_2_poster.jpg',
    'Moonlight': 'Moonlight_(2016_film)_poster.jpg',
    'Coco': 'Coco_(2017_film)_poster.jpg'
};

(async () => {
    for (let m of movies) {
        if (fileNames[m.title]) {
            console.log('Downloading...', m.title);
            const urlToFetch = 'https://en.wikipedia.org/wiki/Special:FilePath/' + encodeURIComponent(fileNames[m.title]);
            const dest = `assets/posters/movie_${m.movie_id}.jpg`;
            const success = await download(urlToFetch, dest);
            if (success) {
                console.log('Downloaded', m.title);
                m.poster = `/${dest}`;
            } else {
                console.log('Failed', m.title);
            }
        }
    }

    const out = 'const MOVIES = ' + JSON.stringify(movies, null, 4) + ';\n\nif (typeof module !== \'undefined\') {\n    module.exports = MOVIES;\n}\n';
    fs.writeFileSync('data/movieData.js', out, 'utf8');

    const backendPath = 'backend/baseMovies.json';
    if (fs.existsSync(backendPath)) {
        let data = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
        data.forEach(m => {
            const fixed = movies.find(x => x.title === m.title && fileNames[x.title]);
            if (fixed) m.poster = fixed.poster;
        });
        fs.writeFileSync(backendPath, JSON.stringify(data, null, 4), 'utf8');
    }
    console.log('Done mapping.');
})();
