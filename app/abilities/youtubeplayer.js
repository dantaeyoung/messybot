var youtubedl = require('youtube-dl');

class youtubeplayer {

  constructor(config) {
    this.config = config;
  }

  getinfo(url) {
    var url = "http://www.youtube.com/watch?v=WKsjaOqDXgg";
    youtubedl.getInfo(url, function(err, info) {
      if (err) throw err;
      console.log('id:', info.id);
      console.log('title:', info.title);
      console.log('url:', info.url);
      console.log('thumbnail:', info.thumbnail);
      console.log('description:', info.description);
      console.log('filename:', info._filename);
      console.log('format id:', info.format_id);
    });
  }



}

module.exports = youtubeplayer;


