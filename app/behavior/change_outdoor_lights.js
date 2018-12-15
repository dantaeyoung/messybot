var convert = require('color-convert');
var colors = require('color-name');
var Particle = require('particle-api-js');
var particle = new Particle();

var PRESET_RAINBOW = [0xFF0000, 0xD52A00, 0xAB5500, 0xAB7F00,
     0xABAB00, 0x56D500, 0x00FF00, 0x00D52A,
     0x00AB55, 0x0056AA, 0x0000FF, 0x2A00D5,
     0x5500AB, 0x7F0081, 0xAB0055, 0xD5002B];

var PRESET_PARTY = [0x5500AB, 0x84007C, 0xB5004B, 0xE5001B,
  0xE81700, 0xB84700, 0xAB7700, 0xABAB00,
  0xAB5500, 0xDD2200, 0xF2000E, 0xC2003E,
  0x8F0071, 0x5F00A1, 0x2F00D0, 0x0007F9]


module.exports = function(config, abilities) {

  var controller = abilities.slack.controller;

  controller.hears('(.*,.*)',['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {

      var commands = parse_slack_msg(message.match[1]);

      var human_message = `Let us change the lights!
      Message format: *time period in seconds*, *colors*.
      For example, you can say "60,random", "100, rainbow", "5, party".
      You can also list a series of colors: "10,red,green,blue,pink", etc. (If we don't understand the colors, we'll just insert random colors.
      You said: ${commands.duration} seconds`; //, ${commands.colors.join(", ")}`;

      send_message_to_spark(config, commands);

      bot.reply(message, human_message);

  });

}




function send_message_to_spark(config, commands) {

  var arg = commands.duration.toString(); 
  var fnPr = particle.callFunction({ deviceId: config.spark.device_id, name: 'setcolors', argument: arg, auth: config.spark.access_token });
  console.log("sent message to spark! with arg: " + arg);
  fnPr.then(function(data) {
    console.log('Function called succesfully:', data);
  }, function(err) {
    console.log('An error occurred:', err);
  });

}



function parse_slack_msg(msg) {
  var commands = {};

  //defaults 
  commands.duration = 60;
  commands.colors = "rainbow";
  commands.human_message = "";

  msgs = msg.toLowerCase().split(",");

  // no commas, do default stuff
  if (msgs.length == 1) {
    commands.human_message += "I couldn't understand your message! reverting to rainbow mode!";
    commands.colors = rainbow;
    return commands;
  }

  if(!isNaN(parseFloat(msgs[0]))) {
    commands.duration = parseFloat(msgs[0])
  } else {
    commands.human_message += "I couldn't understand your duration! Just gonna revert to " + commands.duration + "secs";
  }
 
  if (msgs.length == 2) {
    switch(msgs[1]) {
      case "rainbow": 
        commands.colors = PRESET_RAINBOW;
        break; 
      case "party": 
        commands.colors = PRESET_PARTY;
        break; 
      case "random": 
        commands.colors = "random"; 
        break; 
      default:
        commands.human_message += "I couldn't understand your message! just gonna do rainbow mode!";
        commands.colors = "rainbow"; 
    } 
    return commands;
  }

  // custom colors

   colors = msgs.slice(1).map((d) => name_to_hex(d.trim()));

  return commands;
}

function name_to_hex(name) {
  if (name in colors) {
    return convert.keyword.hex(name);
  } else {
    return convert.rgb.hex(random_color());
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

