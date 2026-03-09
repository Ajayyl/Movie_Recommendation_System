const fs = require('fs');

const replacements = {
    'The Batman': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    'Top Gun: Maverick': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/62HCnUTziyWcpDaBO2i1TXcgMI3.jpg',
    'Knives Out': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pThyQovXQrw2m0s9OBJk5Qk24Y.jpg',
    'Spider-Man: Into the Spider-Verse': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/iiZZdoQBEYBv6id8su7ImL0oRbC.jpg',
    'The Dark Knight': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m77b4CS8ol.jpg',
    'Goodfellas': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
    'WALL-E': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/hBkWeJIeLhSkaZk4vK6Bqf85G20.jpg',
    'Paddington 2': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/vR4PRoEok8YhD1Hw4b8n54bIVtI.jpg',
    'Moonlight': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/1XwB2rGg1a0LwFioP1kP2Krt8d7.jpg',
    'Coco': 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/gGEsBPAijhVMBhnmpGSpnTbTGFA.jpg'
};

const backendPath = 'd:/univibe/backend/baseMovies.json';
if (fs.existsSync(backendPath)) {
    let backendData = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
    for (let movie of backendData) {
        if (replacements[movie.title]) {
            movie.poster = replacements[movie.title];
        }
    }
    fs.writeFileSync(backendPath, JSON.stringify(backendData, null, 4), 'utf8');
    console.log('Successfully updated baseMovies.json');
} else {
    console.log('baseMovies.json not found');
}

const path = 'd:/univibe/data/movieData.js';
if (fs.existsSync(path)) {
    let fileData = fs.readFileSync(path, 'utf8');
    const jsonMatch = fileData.match(/const MOVIES \= (\[[\s\S]*\]);/);
    if (jsonMatch) {
        let movies = eval(jsonMatch[1]);
        for (let movie of movies) {
            if (replacements[movie.title]) {
                movie.poster = replacements[movie.title];
            }
        }
        let outStr = 'const MOVIES = ' + JSON.stringify(movies, null, 4) + ';\n';
        outStr += `\nif (typeof module !== 'undefined') {\n    module.exports = MOVIES;\n}\n`;
        fs.writeFileSync(path, outStr, 'utf8');
        console.log('Successfully updated movieData.js');
    } else {
        console.log('Could not match MOVIES array in movieData.js');
    }
} else {
    console.log('movieData.js not found');
}
