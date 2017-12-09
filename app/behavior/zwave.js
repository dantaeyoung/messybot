module.exports = function(abilities) { 

  var controller = abilities.slack.controller;

  controller.hears(['zwavestatus'],['ambient'],function(bot, message) {
    console.log("who");
    isy.request("/rest/sys", function(err, json) {
      if(!err) {
        bot.reply(message, 'oh, hello, zwave is working.');
      }
    });
  });

  controller.hears(['zwavecmd (.*)'],['ambient'],function(bot,message) {
    var path = message.match[1];
    bot.reply(message, "will execute cmd:" + path);
    isy.request(path, function(err, json) {
      if(!err) {
        console.log(json);
        bot.reply(message, 'oh, hello, zwave is working.');
      }
    });
  });

  controller.hears(['zwave (.*) (.*)'],['ambient'],function(bot,message) {
    var path = "/rest/nodes/" + message.match[1] + "/CMD/";
    if(message.match[2] == "on") { path += "DON"; }
    if(message.match[2] == "off") { path += "DOF"; }
    bot.reply(message, "will execute cmd: " + path);
    isy.request(path, function(err, json) {
      if(!err) {
        bot.reply(message, 'Executed command!');
      }
    });
  });

}

