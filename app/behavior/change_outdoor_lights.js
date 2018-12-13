var convert = require('color-convert');
var colors = require('color-name');

module.exports = function(config, abilities) {

  var controller = abilities.slack.controller;

  controller.hears('lights:(.*)',['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {

      var commands = message.match[1]
      var colors = commands
                    .split(",")
                    .map((d) => name_to_hex(d.trim()));

      var human_message = `Hi! lights lights lights! I think you requested: ${commands}, and here are them as colors: ${colors.join(", ")} `;

    //The wind is blowing from ${compass} at ${d.windspeedmph}mph! Outside, it's ${d.tempf} degrees but feels like ${d.feelsLike.toFixed(2)} with a humidity of ${d.humidity}. Inside, it's ${d.tempinf} degrees. The solar radiation is ${d.solarradiation} and it's rained ${d.dailyrainin}in today so far. Hope you're having a nice day!`
      bot.reply(message, human_message);

  });

}

function name_to_hex(name) {
  if (name in colors) {
    return "#" + convert.keyword.hex(name);
  } else {
    return "#" + convert.rgb.hex(random_color());
  }
}

function random_color() {

  var h = Math.random() * 360;
  var s = 90;
  var l = 60;

  return convert.hsl.rgb(h, s, l);

}

function int_to_hex(n) {
  hexString = n.toString(16);
  if (hexString.length % 2) {
    hexString = '0' + hexString;
  }
  return hexString;
}

