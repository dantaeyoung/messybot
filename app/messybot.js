var config = require('./config/config');


var abilities = {};

// START ISY TOOL

abilities.isy = new (require('./abilities/isytool'))({
  protocol: config.isy.protocol,
  addr: config.isy.addr,
  port: config.isy.port,
  user: config.isy.user,
  pass: config.isy.pass
});

// start slack
abilities.slack = new (require('./abilities/slack'))(config);

// START WEBSERVER
abilities.webserver = require('./abilities/webserver.js')(abilities.slack.controller);


(require('./behavior/banter'))(abilities);
