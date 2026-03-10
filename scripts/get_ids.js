const https = require('https');
const queries = {
  4: 'Blade+Runner+2049+Official+Trailer',
  14: 'Up+2009+Official+Trailer',
  15: 'Moonlight+Official+Trailer+HD+A24',
  27: 'Paddington+2+Official+Trailer',
  31: 'The+Departed+Trailer',
  32: 'Howls+Moving+Castle+Trailer',
  42: 'Everything+Everywhere+All+at+Once+A24+Trailer'
};

Object.keys(queries).forEach(id => {
  const q = queries[id];
  const url = 'https://www.youtube.com/results?search_query=' + q;
  https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
    let data = '';
    res.on('data', c => data+=c);
    res.on('end', () => {
      const match = data.match(/"videoId":"(.*?)"/);
      if(match) console.log(id + ' -> "' + match[1] + '"');
    });
  });
});
