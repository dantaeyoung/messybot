module.exports = function(config, abilities) { 

  var controller = abilities.slack.controller;

  controller.hears(['hello', 'hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,'Hello yourself.');
  });

}

