const http = require('http');

async function testFetchAll() {
    const urls = [
        '/api/movies?tag=cult',
        '/api/movies?tag=underrated',
        '/api/movies?tag=family-safe',
        '/api/movies?experience=intense',
        '/api/movies?experience=emotional',
        '/api/movies?experience=relaxing',
        '/api/movies?genre=Animation',
        '/api/movies?genre=Sci-Fi',
        '/api/movies?genre=Comedy'
    ];

    for (const url of urls) {
        await new Promise((resolve) => {
            http.get('http://localhost:3000' + url, (res) => {
                console.log(url, res.statusCode);
                let data = '';
                res.on('data', c => data += c);
                res.on('end', () => {
                    if (res.statusCode === 500) {
                        console.log('Error data:', data);
                    }
                    resolve();
                });
            });
        });
    }
}
testFetchAll();
