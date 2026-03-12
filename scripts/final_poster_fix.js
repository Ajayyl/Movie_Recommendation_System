const fs = require('fs');
const MOVIES = require('d:/univibe/data/movieData.js');

const verifiedPosters = {
  1: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_Poster.jpg",
  2: "https://upload.wikimedia.org/wikipedia/en/a/a6/The_Grand_Budapest_Hotel_Poster.jpg",
  3: "https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg",
  4: "https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.jpg",
  5: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
  6: "https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie_Poster%29.jpg",
  7: "https://upload.wikimedia.org/wikipedia/en/3/3d/Pulp_Fiction_poster.jpg",
  8: "https://upload.wikimedia.org/wikipedia/en/9/98/Coco_poster.jpg",
  9: "https://upload.wikimedia.org/wikipedia/en/1/13/Drive2011Poster.jpg",
  10: "https://upload.wikimedia.org/wikipedia/en/a/ab/The_Secret_Life_of_Walter_Mitty_poster.jpg",
  11: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
  12: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png",
  13: "https://upload.wikimedia.org/wikipedia/en/d/d4/The_Wolf_of_Wall_Street_poster.jpg",
  14: "https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg",
  15: "https://upload.wikimedia.org/wikipedia/en/8/84/Moonlight_%282016_film%29.png",
  16: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
  17: "https://upload.wikimedia.org/wikipedia/en/4/4c/Lost_in_Translation_poster.jpg",
  18: "https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg",
  19: "https://upload.wikimedia.org/wikipedia/en/a/ad/Truman_show_poster.jpg",
  20: "https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg",
  21: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
  22: "https://upload.wikimedia.org/wikipedia/en/0/0a/Inside_Out_%282015_film%29_poster.jpg",
  23: "https://upload.wikimedia.org/wikipedia/en/8/8a/No_Country_for_Old_Men_poster.jpg",
  24: "https://upload.wikimedia.org/wikipedia/en/c/c2/WALL-Eposter.jpg",
  25: "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
  26: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
  27: "https://upload.wikimedia.org/wikipedia/en/7/71/Paddington_2_poster.jpg",
  28: "https://upload.wikimedia.org/wikipedia/en/a/a4/Eternal_Sunshine_of_the_Spotless_Mind.png",
  29: "https://upload.wikimedia.org/wikipedia/en/9/91/John_Wick_film_poster.jpeg",
  30: "https://upload.wikimedia.org/wikipedia/en/5/5e/Ratatouille_poster.jpg",
  31: "https://upload.wikimedia.org/wikipedia/en/5/50/The_Departed_poster.jpg",
  32: "https://upload.wikimedia.org/wikipedia/en/a/a0/Howls_Moving_Castle_poster.jpg",
  33: "https://upload.wikimedia.org/wikipedia/en/f/f3/Parasite_%282019_film%29.png",
  34: "https://upload.wikimedia.org/wikipedia/en/d/da/Before_Sunrise_poster.jpg",
  35: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg",
  36: "https://upload.wikimedia.org/wikipedia/en/3/39/Soul_%282020_film%29_poster.jpg",
  37: "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas_poster.jpg",
  38: "https://upload.wikimedia.org/wikipedia/en/d/db/The_Princess_Bride_poster.jpg",
  39: "https://upload.wikimedia.org/wikipedia/en/f/f6/A_Quiet_Place_film_poster.jpg",
  40: "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg",
  41: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29_poster.jpeg",
  42: "https://upload.wikimedia.org/wikipedia/en/1/11/Everything_Everywhere_All_at_Once.jpg",
  43: "https://upload.wikimedia.org/wikipedia/en/f/ff/The_Batman_%28film%29_poster.jpg",
  45: "https://upload.wikimedia.org/wikipedia/en/1/19/Top_Gun_Maverick.jpg",
  46: "https://upload.wikimedia.org/wikipedia/en/c/ce/La_La_Land_%28film%29.png",
  47: "https://upload.wikimedia.org/wikipedia/en/f/fa/Spider-Man_Into_the_Spider-Verse_poster.png",
  48: "https://upload.wikimedia.org/wikipedia/en/1/11/Knives_Out_poster.jpeg",
  49: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png",
  51: "https://upload.wikimedia.org/wikipedia/en/d/df/Arrival%2C_Movie_Poster.jpg",
  54: "https://upload.wikimedia.org/wikipedia/en/b/ba/Ex-Machina-poster.jpg",
  60: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg"
};

const updatedMovies = MOVIES.map(movie => {
  if (verifiedPosters[movie.movie_id]) {
    movie.poster = verifiedPosters[movie.movie_id];
  }
  return movie;
});

let outStr = 'const MOVIES = ' + JSON.stringify(updatedMovies, null, 4) + ';\n';
outStr += `\nif (typeof module !== 'undefined') {\n    module.exports = MOVIES;\n}\n`;

fs.writeFileSync('d:/univibe/data/movieData.js', outStr, 'utf8');
console.log('Successfully updated movieData.js with verified Wikipedia/Wikimedia links');

const backendPath = 'd:/univibe/backend/baseMovies.json';
if (fs.existsSync(backendPath)) {
    let backendData = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
    backendData = backendData.map(m => {
        if (verifiedPosters[m.movie_id]) {
            m.poster = verifiedPosters[m.movie_id];
        }
        return m;
    });
    fs.writeFileSync(backendPath, JSON.stringify(backendData, null, 4), 'utf8');
    console.log('Successfully updated backend/baseMovies.json');
}
