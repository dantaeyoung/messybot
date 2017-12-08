var Botkit = require('botkit');
var $ = require('jquery')
var request = require('request');
var config = require('./config');
var xml2js = require("xml2js");

function isyRequest(path, callback) {
  var url = config.isy.protocol + '://' + config.isy.user + ":" + config.isy.pass + "@"  + config.isy.addr + ":" + config.isy.port;
  request({
    url: url + path,
  }, function (error, response, body) {
    if(error || response.statusCode == 404) {
      callback(true, {});
    }
    if (!error && response.statusCode == 200) {
      xml2js.parseString(body, function (err, json) {
        callback(false, json);
      });
    }
  });
}

// CONNECT SLACK
var controller = Botkit.slackbot({ debug: true });
var bot = controller.spawn({
    token: config.slack.api_token
}).startRTM();


controller.hears(['zwavestatus'],['ambient'],function(bot,message) {
  console.log("who");
  isyRequest("/rest/sys", function(err, json) {
    if(!err) {
      bot.reply(message, 'oh, hello, zwave is working.');
    }
  });
});

controller.hears(['zwavecmd (.*)'],['ambient'],function(bot,message) {
  var path = message.match[1];
  bot.reply(message, "will execute cmd:" + path);
  isyRequest(path, function(err, json) {
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
  isyRequest(path, function(err, json) {
    if(!err) {
      bot.reply(message, 'Executed command!');
    }
  });
});

controller.hears(['hello', 'hi'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'Hello yourself.');
});


