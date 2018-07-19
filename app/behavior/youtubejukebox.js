

module.exports = function(config, abilities) { 

  var controller = abilities.slack.controller;

  controller.hears('(http.*youtube.com/watch.*)',['direct_message', 'direct_mention', 'mention'], function(bot, message) {

    	var yturl = message.match[1];
			bot.reply(message, "Oooh, I hope this youtube link is music! Going to play it... say 'stop' or 'voldown' or 'volup' if you want to control the music!");
		  abilities.youtubeplayer.playAudio(yturl, function(d) {
        bot.reply(message, "Playing :: " + d.info.title);
      });

	});


  controller.hears('(http.*youtube.com/watch.*)',['direct_message', 'direct_mention', 'mention'], function(bot, message) {

    	var yturl = message.match[1];
			bot.reply(message, "Oooh, I think this is music! Going to play it..");
		  abilities.youtubeplayer.playAudio(yturl, function(d) {
        bot.reply(message, "Playing :: *" + d.info.title + "*");
      });

	});


  controller.hears('stop',['direct_message', 'direct_mention', 'mention'], function(bot, message) {
		  abilities.youtubeplayer.pause();
	});
  controller.hears('volup',['direct_message', 'direct_mention', 'mention'], function(bot, message) {
		  abilities.youtubeplayer.volUp();
	});
  controller.hears('voldown',['direct_message', 'direct_mention', 'mention'], function(bot, message) {
		  abilities.youtubeplayer.volDown();
	});


}

