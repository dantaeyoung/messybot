var request = require('request');
var xml2js = require("xml2js");

class isy {
  constructor(config) {
    this.protocol = config.isy.protocol;
    this.addr = config.isy.addr;
    this.port = config.isy.port;
    this.user = config.isy.user;
    this.pass = config.isy.pass;
  }

  request(path, callback) {
    var url = this.protocol + '://' + this.user + ":" + this.pass + "@"  + this.addr + ":" + this.port;
    request({
      url: url + path,
    }, function (error, response, body) {
      if(error || response.statusCode == 404) {
        callback(true, {});
      }
      if (!error && response.statusCode == 200) {
        xml2js.parseString(body, function (err, json) {
          callback(false, json);
        });
      }
    });
  }

}

module.exports = isy;
