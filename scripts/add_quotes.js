const fs = require('fs');

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
  44: "It's not the plane, it's the pilot. — The tools don't make the master. Your heart and skill do.",
  45: "Here's to the ones who dream, foolish as they may seem. — The world needs more dreamers, not fewer. Keep believing.",
  46: "Anyone can wear the mask. — You don't have to be perfect to be a hero. Just show up.",
  47: "I suspect foul play. — Look beneath the surface. Things aren't always what they seem.",
  48: "What we do in life echoes in eternity. — Your actions today write the legacy of tomorrow.",
  49: "If you could see your whole life laid out, would you change things? — Every ending is also a beginning. Trust the journey.",
  50: "One day the AIs are going to look back on us the same way we look at fossils. — Progress without empathy is just destruction in disguise.",
  51: "All I have are negative thoughts. — Be gentle with yourself. The world is heavy enough without fighting your own mind too."
};

let content = fs.readFileSync('d:/univibe/data/movieData.js', 'utf8');

Object.entries(quotes).forEach(([id, quote]) => {
  const movieId = parseInt(id);
  const escapedQuote = quote.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  
  const synopsisPattern = new RegExp(
    '("movie_id": ' + movieId + ',[\\s\\S]*?"synopsis": "[^"]+",)'
  );
  
  content = content.replace(synopsisPattern, (match) => {
    return match + '\n        "quote": "' + escapedQuote + '",';
  });
});

fs.writeFileSync('d:/univibe/data/movieData.js', content, 'utf8');
console.log('Done adding quotes');

delete require.cache[require.resolve('d:/univibe/data/movieData.js')];
const m = require('d:/univibe/data/movieData.js');
console.log('Movies:', m.length);
console.log('Quote #1:', m[0].quote ? m[0].quote.substring(0, 80) + '...' : 'MISSING');
console.log('Quote #51:', m.find(x => x.movie_id === 51).quote ? 'OK' : 'MISSING');

let missing = m.filter(x => !x.quote).map(x => x.title);
console.log('Missing quotes:', missing.length > 0 ? missing.join(', ') : 'NONE - all 51 have quotes!');
