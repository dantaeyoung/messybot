var config = require('./config/config');


var abilities = {};

// START ISY TOOL

abilities.isy = new (require('./abilities/isy'))(config);

// start slack
abilities.slack = new (require('./abilities/slack'))(config);

// START WEBSERVER
abilities.webserver = require('./abilities/webserver.js')(config, abilities);


(require('./behavior/banter'))(abilities);
