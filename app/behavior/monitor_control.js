var cmd = require('node-cmd');

module.exports = function(config, abilities) { 

  var controller = abilities.slack.controller;

  function monitorOff() {
      cmd.get('vcgencmd display_power 0', function(err, data, stderr) {
        //console.log('the current working dir is : ',data)
      });
  };
  function monitorOn() {
      cmd.get('vcgencmd display_power 1', function(err, data, stderr) {
        //console.log('the current working dir is : ',data)
      });
  };

  controller.hears('turn monitor (.*)',['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    if(message.match[1] == "off") {
      bot.reply(message,'Okay! Turning monitor off!');
      monitorOff();
    } else {
      bot.reply(message,'Okay! Turning monitor on!');
      monitorOn();
    }
  });

  controller.hears(['on', 'off'],['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    if(message.match[0] == "off") {
      bot.reply(message,'Okay! Turning monitor off!');
      monitorOff();
    } else {
      bot.reply(message,'Okay! Turning monitor on!');
      monitorOn();
    }
  });


}

