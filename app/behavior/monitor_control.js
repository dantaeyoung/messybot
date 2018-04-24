module.exports = function(config, abilities) { 

  var controller = abilities.slack.controller;

  function monitorOff() {
      bot.reply(message,'Okay! Turning monitor off!');
      cmd.get('vcgencmd display_power 0', function(err, data, stderr) {
        //console.log('the current working dir is : ',data)
      });
  };
  function monitorOn() {
      bot.reply(message,'Okay! Turning monitor on!');
      cmd.get('vcgencmd display_power 1', function(err, data, stderr) {
        //console.log('the current working dir is : ',data)
      });
  };

  controller.hears('turn monitor (.*)',['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    if(message.match[1] == "off") {
      monitorOff();
    } else {
      monitorOn();
    }
  });

  controller.hears(['on', 'off'],['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    if(message.match[0] == "off") {
      monitorOff();
    } else {
      monitorOn();
    }
  });


}

