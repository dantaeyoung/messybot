module.exports = function(config, abilities) { 

  var controller = abilities.slack.controller;

  controller.hears(['hello', 'hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,'Hello yourself.');
  });

  controller.hears(['what can you do'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Not that much right now, I'm afraid.");
  });

  controller.hears(['lunch', 'dinner'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"I'm not hungry because I don't have a stomach, but you go ahead and eat without me.");
  });

  controller.hears(['good bot'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"awwww thank you!.");
  });

}

