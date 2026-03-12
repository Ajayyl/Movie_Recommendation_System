const fs = require('fs');
const path = require('path');

const postersDir = 'd:/univibe/assets/posters';
const files = fs.readdirSync(postersDir);

console.log('--- POSTER FILE SIZES ---');
files.forEach(file => {
    const stats = fs.statSync(path.join(postersDir, file));
    if (stats.size < 5000) {
        console.log(`[BROKEN?] ${file}: ${stats.size} bytes`);
    } else {
        // console.log(`${file}: ${stats.size} bytes`);
    }
});
