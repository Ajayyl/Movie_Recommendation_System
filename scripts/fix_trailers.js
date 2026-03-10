const fs = require('fs');

let content = fs.readFileSync('d:/univibe/data/movieData.js', 'utf8');

const replacements = {
  'gCcx85e7-sI': 'gCcx85zbxz4',   // Blade Runner 2049
  'ORFo8veHyGE': 'HWEW_qTLSEE',   // Up
  '9NJj12tiBzc': '9NJj12tJzqc',   // Moonlight
  'sCMGPqeGD2k': '52x5HJ9H8DM',   // Paddington 2
  'iUJkwotOWCs': 'iojhqm0JTW4',   // The Departed
  'iwROgK94ycU': 'iwROgK94zcM',   // Howl's Moving Castle
  'wxN1T1qdqzk': 'wxN1T1uxQ2g'    // Everything Everywhere
};

Object.entries(replacements).forEach(([oldId, newId]) => {
  content = content.replace(oldId, newId);
});

fs.writeFileSync('d:/univibe/data/movieData.js', content, 'utf8');
console.log('Fixed trailers.');
