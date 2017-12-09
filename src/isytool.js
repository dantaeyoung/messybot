var request = require('request');
var xml2js = require("xml2js");

function isytool(config) {
  this.protocol = config.protocol;
  this.addr = config.addr;
  this.port = config.port;
  this.user = config.user;
  this.pass = config.pass;
}

isytool.prototype.request = function(path, callback) {
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


module.exports = isytool;
