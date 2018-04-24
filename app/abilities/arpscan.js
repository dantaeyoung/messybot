
var arpScanner = require('arpscan/promise');
 
class arpscan {
  constructor(config) {
  }

  scan(options, cb) {

    arpScanner(options)
        .then(cb)
        .catch(function(err) {
          console.log(err);
        });

  }

  simplescan(cb) {
    arpScanner({
      'command': "arp-scan",
        'args': ["-l"],
      'interface': 'en0'
      })
      .then(function(data) {
        cb(data);
      })
      .catch(function(err) {
        console.log(err);
      });

  }



}

module.exports = arpscan;

