var youtubedl = require('youtube-dl');
var Omx = require('node-omxplayer');

class youtubeplayer {

  constructor(config) {
    this.config = config;
    this.volume = -3000;
    this.queue = [];
    this.omxplayer = Omx("", "both", "false", this.volume);
  }


  _getInfo(yturl, cb) {
    youtubedl.getInfo(yturl, function(err, info) {
      if (err) throw err;
      /*console.log('id:', info.id);
      console.log('title:', info.title);
      console.log('thumbnail:', info.thumbnail);
      console.log('description:', info.description);
      console.log('filename:', info._filename);
      console.log('format id:', info.format_id);
      console.log('url:', info.url);*/
      cb(info);
    });
  }

  _getAudioURL(yturl, cb) {
    var self = this;
    self._getInfo(yturl, function(ytinfo) {

      var m4aurl;
      for(let format of ytinfo.formats) {
        if(format.ext == 'm4a') {
          m4aurl = format.url;
        }
      }
//      cb({ "audiourl": m4aurl, "info": ytinfo });
      cb({ "audiourl": ytinfo.url, "info": ytinfo }); // lots of videos dont seem to have m4a

    });
  }


  playAudio(yturl, cb) {
    var self = this;
    self._getAudioURL(yturl, function(d) {
      self.omxplayer.newSource(d.audiourl, "both", "false", self.volume);
      self.omxplayer.on('close', function() {
        self.playNext(cb);
      });
      cb(d);
    });
  }
    
  play() {
    this.omxplayer.play()
  }    

  playNext(cb) {
    if(this.queue.length > 0) {
      var nexturl = this.queue.pop();
      this.playAudio(nexturl, cb);
    }
  }    

  addToQueue(url) {
    this.queue.push(url);
  }

  pause() {
    this.omxplayer.pause()
  }    

  volUp() {
    this.omxplayer.volUp()
    this.volume = Math.min(0, this.volume + 300);

  }      

  volDown() {
    this.omxplayer.volDown()
    this.volume = Math.max(-6000, this.volume - 300);
  }



}

module.exports = youtubeplayer;


