

module.exports = function(config, abilities) { 

  var controller = abilities.slack.controller;

  controller.hears('(http.*youtube.com/watch.*)',['direct_message', 'direct_mention', 'mention'], function(bot, message) {

    	var yturl = message.match[1];
			bot.reply(message, "Oooh, I hope this youtube link is music! Going to try to play it... @ me and say _stop_ or _voldown_ or _volup_ if you want to control the music!");
		  abilities.youtubeplayer.playAudio(yturl, function(d) {
        bot.reply(message, "Playing :: *" + d.info.title + "*");
      });

	});


  controller.hears('stop',['direct_message', 'direct_mention', 'mention'], function(bot, message) {
		  abilities.youtubeplayer.pause();
			bot.reply(message, "Pausing Youtube music!");
	});
  controller.hears('volup',['direct_message', 'direct_mention', 'mention'], function(bot, message) {
		  abilities.youtubeplayer.volUp();
			bot.reply(message, "raising VOLUME!!!!");
	});
  controller.hears('voldown',['direct_message', 'direct_mention', 'mention'], function(bot, message) {
		  abilities.youtubeplayer.volDown();
			bot.reply(message, "....lowering volume....");
	});


}

