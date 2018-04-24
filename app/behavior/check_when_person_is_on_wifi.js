
module.exports = function(config, abilities) { 

  var controller = abilities.slack.controller;

  controller.hears('who here',['direct_message', 'direct_mention', 'mention'], function(bot, message) {

    abilities.arpscan.simplescan(function(res) { 
      var addresses = [...new Set(res.map(x => x['mac']))]
      console.log(addresses);
      bot.reply(message, addresses.join("\n"));
    });

  });


}

