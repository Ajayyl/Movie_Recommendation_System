const fs = require('fs');
const Database = require('better-sqlite3');

const movieDataPath = 'd:/univibe/data/movieData.js';
const baseMoviesPath = 'd:/univibe/backend/baseMovies.json';
const dbPath = 'd:/univibe/backend/data/univibe.db';

const posterFixes = {
    // English/Global
    "Inception": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/oYu6YfOuzS6099YmS8vSAsS6Sps.jpg",
    "The Grand Budapest Hotel": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/nX5XotM9yprCKarRH4fzOq1VM1J.jpg",
    "Blade Runner 2049": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    "Finding Nemo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ggq966pB90U49S3MvN797v9A94E.jpg",
    "Fight Club": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/b1ONg8Is4l760oryJa7Aw7LdPtM.jpg",
    "No Country for Old Men": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/61qLMfs2CJ5tmtctXvr8LQbLzPl.jpg",
    "WALL-E": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fLXLNDsOBZxpNleWF9Z4hubxBUQ.jpg",
    "Paddington 2": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4bxacqeWIrOFNwpGjsDbWWQIbkM.jpg",
    "Soul": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/pEz5aROvfy5FBW1OTlrDO3VryWO.jpg",
    "La La Land": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    "Spider-Man: Into the Spider-Verse": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/iiZZdoBmB1D19p9S79idqkv0S31.jpg",

    // Tamil Collection
    "Enthiran": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/wfPHdfofBD5PN96dV96a51B3Ja2.jpg",
    "Nayakan": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/hnCKKPG5VkUiGQV0DTniyMTEZsT.jpg",
    "Thalapathi": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/dpF1Ck1UvpW0ItT1EoX0xNYEhS8.jpg",
    "Asuran": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/Elnp3XrAlMM30dil8rbL7D9XeP.jpg",
    "Jai Bhim": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ehybiOtBUtrMkmtB39zQEtq1Jie.jpg",
    "Soorarai Pottru": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/5uimlxPCgAei8JfQUDFEUQLoyyh.jpg",
    "Vada Chennai": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4Pa7SriYtq4BdoS2BAPm6w66vLi.jpg",
    "Ponniyin Selvan: I": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/zSNyZUeqDdii0doQ9970E90kCkb.jpg",
    "Indian": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/zhGayNbH2ZHWaJkhSv3qEhs5fy6.jpg",
    "Vikram": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/6s88AqqeJqT7iL3SndOa0mX1c7p.jpg"
};

function runFix() {
    console.log("Applying official poster fixes...");

    let MOVIES = require(movieDataPath);
    let count = 0;
    MOVIES.forEach(m => {
        if (posterFixes[m.title]) {
            m.poster = posterFixes[m.title];
            count++;
        }
    });

    const jsContent = 'const MOVIES = ' + JSON.stringify(MOVIES, null, 4) + ';\n\nif (typeof module !== "undefined") { module.exports = MOVIES; }\n';
    fs.writeFileSync(movieDataPath, jsContent);
    console.log(`Updated movieData.js (${count} fixes)`);

    fs.writeFileSync(baseMoviesPath, JSON.stringify(MOVIES, null, 4));
    console.log("Updated baseMovies.json");

    const db = new Database(dbPath);
    const update = db.prepare('UPDATE movies SET poster = ? WHERE title = ?');
    const transaction = db.transaction((data) => {
        for (const [title, poster] of Object.entries(data)) {
            update.run(poster, title);
        }
    });
    transaction(posterFixes);
    db.close();
    console.log("Updated univibe.db");

    console.log("Fix complete. Official posters applied.");
}

runFix();
