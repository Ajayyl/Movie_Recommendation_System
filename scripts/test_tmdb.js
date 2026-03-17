const https = require('https');
const API_KEY = '15d2ea6d0dc1d476efbca3eba2428bab';
const title = 'Enthiran';
const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`;
console.log(`Searching: ${url}`);
https.get(url, (res) => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => console.log('Response:', body));
}).on('error', e => console.error('Error:', e));
