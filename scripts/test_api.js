const http = require('http');

console.time('fetch');
http.get('http://localhost:3000/api/movies', (res) => {
    console.log('Status:', res.statusCode);

    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            console.timeEnd('fetch');
            const parsedData = JSON.parse(rawData);
            console.log('Success:', parsedData.success);
            console.log('Results length:', parsedData.data.length);
        } catch (e) {
            console.log('Raw output:', rawData.substring(0, 100));
            console.error(e.message);
        }
    });
}).on('error', (e) => {
    console.timeEnd('fetch');
    console.error(`Got error: ${e.message}`);
});
