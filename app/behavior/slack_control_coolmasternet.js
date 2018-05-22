
module.exports = function(config, abilities) { 

  var controller = abilities.slack.controller;

  controller.hears('hvac (.*)',['direct_message', 'direct_mention', 'mention'], function(bot, message) {

    console.log("I heard" + message.match[1]);
   
    if(message.match[1] == "status") {

      abilities.coolmasternet.stat((d) => {

        var mesg = ""
        for(var did in d['devices']) {
          var thisd = d['devices'][did];
          if(thisd.status == "ON") {
            mesg += `*Unit ${thisd.id} is ${thisd.status}; ${thisd.mode} ${thisd.fan}*; current temp ${thisd.temp}, setpoint ${thisd.setpoint}\n`
          } else {
            mesg += `Unit ${thisd.id}: ${thisd.status}; current temp ${thisd.temp}, setpoint ${thisd.setpoint}\n`; 
          }
        }

        bot.reply(message, mesg);

      });

    } else {

      console.log(message.match[1]);
      abilities.coolmasternet.send_message(message.match[1], (d) => {
        bot.reply(message, d);
      });

    }
 })

}

