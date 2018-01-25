var config = require('./config/config');

var abilities = {};

console.log("= CONNECT TO ISY");
abilities.isy = new (require('./abilities/isy'))(config);

console.log("= CONNECT TO SLACK");
abilities.slack = new (require('./abilities/slack'))(config);

//console.log("= CONNECT TO DMX");
//abilities.dmx = new (require('./abilities/dmx'))(config);

console.log("= START WEBSERVER");
abilities.webserver = require('./abilities/webserver.js')(config, abilities);

console.log("= ADD BEHAVIORS");

// Add behaviors
(require('./behavior/banter'))(config, abilities);

(require('./behavior/zwave'))(config, abilities);

(require('./behavior/webroutes'))(config, abilities);

(require('./behavior/qrswitches'))(config, abilities);

console.log("= RUNNING!");
