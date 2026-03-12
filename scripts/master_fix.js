const fs = require('fs');
const movies = require('d:/univibe/data/movieData.js');

const quotes = {
  1: "An idea is like a virus. Resilient. Highly contagious. — Sometimes the smallest thought planted in your mind changes your entire life.",
  2: "There are still faint glimmers of civilization left in this barbaric slaughterhouse. — Even in chaos, hold on to what makes life beautiful.",
  3: "Just keep swimming. — When life gets hard, the only way out is forward.",
  4: "All those moments will be lost in time, like tears in rain. — Cherish every moment — they won't last forever.",
  5: "Get busy living, or get busy dying. — Hope is the one thing no prison can take from you.",
  6: "Sometimes you just need to sit with a giant, fluffy friend. — Find your quiet place in this noisy world.",
  7: "The path of the righteous man is beset on all sides. — Life isn't about the destination, it's about the messy journey.",
  8: "Never forget where you come from. — Your roots are the most beautiful part of who you are.",
  9: "There are no clean getaways. — Some roads look simple, but every choice has a cost.",
  10: "To see the world, things dangerous to come to. To see behind walls, draw closer. — Life begins where your comfort zone ends.",
  11: "We used to look up at the sky and wonder. Now we just look down and worry. — Don't forget to dream big, even when reality weighs you down.",
  12: "Once you meet someone, you never really forget them. — The people who change your life stay in your heart forever.",
  13: "The only thing standing between you and your goal is the story you keep telling yourself. — Stop making excuses. Start making moves.",
  14: "Adventure is out there! — You're never too old to chase your dreams.",
  15: "At some point, you gotta decide for yourself who you gonna be. — Don't let the world write your story for you.",
  16: "I know you're out there. I can feel you now. — The reality you accept is the reality you live in. Question everything.",
  17: "Let's never come here again because it would never be as much fun. — Some moments are perfect precisely because they can't be repeated.",
  18: "Oh, what a day! What a lovely day! — When everything burns around you, find something worth fighting for.",
  19: "We accept the reality of the world with which we are presented. — Break free from the show others have written for you.",
  20: "Times are hard for dreamers. — But the world needs your kind of crazy. Never stop imagining.",
  21: "It's only after we've lost everything that we're free to do anything. — Sometimes you have to let go of who you were to become who you need to be.",
  22: "Do you ever look at someone and wonder: what is going on inside their head? — Be kind. Everyone is fighting battles you can't see.",
  23: "You can't stop what's coming. — Life doesn't wait for you to be ready. Keep moving anyway.",
  24: "I don't want to survive. I want to live. — Existing isn't enough. Make every day count.",
  25: "The past is just a story we tell ourselves. — You are not your mistakes. You are what you choose to be next.",
  26: "Why so serious? — The world will test you. Don't lose your sense of self in the process.",
  27: "If we're kind and polite, the world will be right. — A little kindness goes a long way, even when the world doesn't deserve it.",
  28: "How happy is the blameless soul's lot! — Forgetting someone doesn't erase what they meant to you.",
  29: "People keep asking if I'm back. Yeah, I'm thinking I'm back. — When life knocks you down, come back stronger than ever.",
  30: "Not everyone can become a great artist, but a great artist can come from anywhere. — Never let anyone tell you that your background defines your limits.",
  31: "When you're facing a loaded gun, what's the difference? — Trust is fragile. Once broken, the game changes forever.",
  32: "A heart's a heavy burden. — Love isn't always easy, but it's always worth the weight.",
  33: "They're not cockroaches. You can't just stamp on them. — The divide between rich and poor is a wound that never stops bleeding.",
  34: "Isn't everything we do in life a way to be loved a little more? — At the end of the day, all anyone really wants is connection.",
  35: "There are no two words more harmful than 'good job'. — Greatness demands discomfort. Comfort is the enemy of growth.",
  36: "Is all this living really worth dying for? — What makes life meaningful isn't the achievement — it's the passion.",
  37: "As far back as I can remember, I always wanted to be a gangster. — We all chase versions of success. Make sure yours doesn't cost you everything.",
  38: "As you wish. — True love doesn't need grand gestures. Sometimes three simple words say it all.",
  39: "If they hear you, they hunt you. — In a world full of noise, sometimes silence is your greatest strength.",
  40: "Remember who you are. — When life makes you forget your worth, look inside — your strength was always there.",
  41: "Fear is the mind-killer. — Courage isn't the absence of fear. It's choosing to move forward despite it.",
  42: "Every rejection, every disappointment has led you here. — Your struggles aren't setbacks — they're setup for something bigger.",
  43: "I'm vengeance. — Anger can drive you, but it's justice and purpose that give life meaning.",
  45: "It's not the plane, it's the pilot. — The tools don't make the master. Your heart and skill do.",
  46: "Here's to the ones who dream, foolish as they may seem. — The world needs more dreamers, not fewer. Keep believing.",
  47: "Anyone can wear the mask. — You don't have to be perfect to be a hero. Just show up.",
  48: "I suspect foul play. — Look beneath the surface. Things aren't always what they seem.",
  49: "What we do in life echoes in eternity. — Your actions today write the legacy of tomorrow.",
  51: "If you could see your whole life laid out, would you change things? — Every ending is also a beginning. Trust the journey.",
  54: "One day the AIs are going to look back on us the same way we look at fossils. — Progress without empathy is just destruction in disguise.",
  60: "All I have are negative thoughts. — Be gentle with yourself. The world is heavy enough without fighting your own mind too."
};

const trailers = {
  1: "YoHD9XEInc0",
  2: "1Fg5iWmQjwk",
  3: "SPHfeNgogVs",
  4: "gCcx85e7-sI",
  5: "PLl99DlL6b4",
  6: "92a7Hj0ijLs",
  7: "s7EdQ4FqbhY",
  8: "Rvr68u6k5sI",
  9: "KBiOF3y1W0Y",
  10: "QD6cy4PBQPI",
  11: "zSWdZVtXT7E",
  12: "ByXuk9QqQkk",
  13: "iszwuX1AK6A",
  14: "ORFo8veHyGE",
  15: "9NJj12tiBzc",
  16: "vKQi3bBA1y8",
  17: "W6iVPCRflQM",
  18: "hEJnMQG9ev8",
  19: "dlnmQbPGuls",
  20: "HUECWi5pX7o",
  21: "qtRKdVHc-cE",
  22: "yRUAzGQ3nSY",
  23: "38A__WT3-o0",
  24: "alIq_wG9FNk",
  25: "ne6p6MfLBxc",
  26: "EXeTwQWrcwY",
  27: "sCMGPqeGD2k",
  28: "07-QBnEkgXU",
  29: "2AUmvWm5ZDQ",
  30: "NgsQ8mVkN8w",
  31: "o25VXTr6VH8", // Fixed Departed Trailer
  32: "iwROgK94ycU",
  33: "SEUXfv87Wpk",
  34: "6MUcuqbGTxc",
  35: "7d_jQycdQGo",
  36: "xOsLIiBStEs",
  37: "2ilzidi_J8Q",
  38: "WNNUcHRiPS8",
  39: "WR7cc5t7tv8",
  40: "4sj1MT05lAA",
  41: "8g18jFHCLXk",
  42: "wxN1T1qdqzk",
  43: "mqqft2x_Aa4",
  45: "giXco2jaZ_4",
  46: "0pdqf4P9MB8",
  47: "g4Hbz2jLxvQ",
  48: "qGqiHJTsRkQ",
  49: "owK1qxDselE",
  51: "tFMo3UJ4B4g",
  54: "EoQuVnKhxaM",
  60: "zAGVQLHvwOY"
};

const fixedPosters = {
  1: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg", // Inception
  2: "/assets/posters/movie_2.png",
  3: "https://m.media-amazon.com/images/M/MV5BZDU3MWY4YzQtYTJhZi00N2Y0LThmMDgtNDFiYmRjOTA3YWVlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg", // Finding Nemo
  4: "https://m.media-amazon.com/images/M/MV5BMjA3NTEwOTMxMV5BMl5BanBnXkFtZTgwMjMyODgzMzI@._V1_.jpg", // Blade Runner 2049
  5: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxNzMtY2YzZC00NmNlLWJiMzMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg", // Shawshank
  6: "/assets/posters/movie_6.jpg",
  7: "/assets/posters/movie_7.jpg",
  8: "/assets/posters/movie_8.jpg",
  9: "/assets/posters/movie_9.jpg",
  10: "https://m.media-amazon.com/images/M/MV5BMTE1NzkxOTkxMTleQTJeQWpwZ15BbWU4MDQ4NTEzNzEx._V1_.jpg", // Walter Mitty
  11: "/assets/posters/movie_11.jpg",
  12: "/assets/posters/movie_12.jpg",
  13: "/assets/posters/movie_13.jpg",
  14: "/assets/posters/movie_14.jpg",
  15: "https://m.media-amazon.com/images/M/MV5BN2RjMDc5ZDItNTY2My00NjUyLWFjOTAtOGExMjQ0YmEwMTEyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg", // Moonlight
  16: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg", // Matrix
  17: "/assets/posters/movie_17.jpg",
  18: "/assets/posters/movie_18.jpg",
  19: "/assets/posters/movie_19.jpg",
  20: "/assets/posters/movie_20.jpg",
  21: "/assets/posters/movie_21.jpg",
  22: "https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_.jpg", // Inside Out
  23: "/assets/posters/movie_23.jpg",
  24: "/assets/posters/movie_24.jpg",
  25: "/assets/posters/movie_25.jpg",
  26: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg", // Joker? No, wait. 26 is Dark Knight.
  27: "/assets/posters/movie_27.jpg",
  28: "/assets/posters/movie_28.jpg",
  29: "/assets/posters/movie_29.jpg",
  30: "/assets/posters/movie_30.jpg",
  31: "/assets/posters/movie_31.jpg",
  32: "/assets/posters/movie_32.jpg",
  33: "/assets/posters/movie_33.jpg",
  34: "/assets/posters/movie_34.jpg",
  35: "/assets/posters/movie_35.jpg",
  36: "/assets/posters/movie_36.png",
  37: "/assets/posters/movie_37.jpg",
  38: "/assets/posters/movie_38.jpg",
  39: "/assets/posters/movie_39.jpg",
  40: "/assets/posters/movie_40.jpg",
  41: "/assets/posters/movie_41.jpg",
  42: "/assets/posters/movie_42.jpg",
  43: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg", // The Batman
  45: "/assets/posters/movie_44.jpg",
  46: "/assets/posters/movie_45.jpg",
  47: "/assets/posters/movie_46.jpg",
  48: "/assets/posters/movie_47.jpg",
  49: "/assets/posters/movie_48.jpg",
  51: "/assets/posters/movie_49.jpg",
  54: "/assets/posters/movie_50.jpg",
  60: "/assets/posters/movie_51.jpg"
};

movies.forEach(m => {
  const id = m.movie_id;
  if (quotes[id]) m.quote = quotes[id];
  if (trailers[id]) m.trailer = trailers[id];
  if (fixedPosters[id]) m.poster = fixedPosters[id];
});

let outStr = 'const MOVIES = ' + JSON.stringify(movies, null, 4) + ';\n';
outStr += `\nif (typeof module !== 'undefined') {\n    module.exports = MOVIES;\n}\n`;

fs.writeFileSync('d:/univibe/data/movieData.js', outStr, 'utf8');
console.log('Successfully updated movieData.js');

const backendPath = 'd:/univibe/backend/baseMovies.json';
if (fs.existsSync(backendPath)) {
    let backendData = JSON.parse(fs.readFileSync(backendPath, 'utf8'));
    backendData.forEach(m => {
        const id = m.movie_id;
        if (quotes[id]) m.quote = quotes[id];
        if (trailers[id]) m.trailer = trailers[id];
        if (fixedPosters[id]) m.poster = fixedPosters[id];
    });
    fs.writeFileSync(backendPath, JSON.stringify(backendData, null, 4), 'utf8');
    console.log('Successfully updated backend/baseMovies.json');
}
