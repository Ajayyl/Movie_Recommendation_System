async function test() {
    const API_KEY = '15d2ea6d0dc1d476efbca3eba2428bab';
    const query = 'Indian';
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    console.log(data);
}
test();
