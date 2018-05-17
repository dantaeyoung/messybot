
module.exports = function(config, abilities) { 

  var controller = abilities.slack.controller;

  controller.hears('weather',['direct_message', 'direct_mention', 'mention'], function(bot, message) {

    abilities.ambientweather.get_weather_slow((d) => {

      var human_message = `Hi! Hope you're having a nice day! The wind is blowing at ${d.winddir} degrees from North at ${d.windspeedmph}mph! Outside, it's ${d.tempf} degrees but feels like ${d.feelsLike}F with a humidity of ${d.humidity}. Inside, it's ${d.tempinf} degrees. The solar radiation is ${d.solarradiation} and it's rained ${d.dailyrainin}in today so far.`
        
      bot.reply(message, human_message);

    });

  });


}

