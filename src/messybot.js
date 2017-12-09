var Botkit = require('botkit');
var $ = require('jquery')
var request = require('request');
var xml2js = require("xml2js");
var config = require('./config');
var isytool = require('./isytool');


var isy = new isytool({
  protocol: config.isy.protocol,
  addr: config.isy.addr,
  port: config.isy.port,
  user: config.isy.user,
  pass: config.isy.pass
})

// CONNECT SLACK
var controller = Botkit.slackbot({ debug: true });
var bot = controller.spawn({
    token: config.slack.api_token
}).startRTM();


var webserver = require('./server.js')(controller);

controller.hears(['zwavestatus'],['ambient'],function(bot,message) {
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

controller.hears(['hello', 'hi'],['direct_message','direct_mention','mention'],function(bot,message) {
  bot.reply(message,'Hello yourself.');
});


