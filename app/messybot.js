var config = require('./config/config');

var abilities = {};

// START ISY TOOL
abilities.isy = new (require('./abilities/isy'))(config);

// START SLACK
abilities.slack = new (require('./abilities/slack'))(config);

// START WEBSERVER
abilities.webserver = require('./abilities/webserver.js')(config, abilities);


// Add behaviors
(require('./behavior/banter'))(abilities);

(require('./behavior/zwave'))(abilities);

(require('./behavior/webroutes'))(abilities);
