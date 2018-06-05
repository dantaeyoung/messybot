function callback_chain_hvac_commands(bot, message, abilities, comms) {

  if(comms.length == 0) { return; } //recursion done

  var firstcomm = comms[0];
  var restcomms = comms.slice(1); //shallow copy

  console.log("sending command: " + firstcomm);

  abilities.coolmasternet.send_message(firstcomm, (d) => {
    bot.reply(message, "OK! Sending command `" + firstcomm + "` to the HVAC system.");
    callback_chain_hvac_commands(bot, message, abilities, restcomms); //recursion!
  });

}


module.exports = function(config, abilities) { 

  var controller = abilities.slack.controller;

  controller.hears('hvac (.*)',['direct_message', 'direct_mention', 'mention'], function(bot, message) {

    var hvacmessage = message.match[1].replace(/^[.\s]+|[.\s]+$/g, "");

    console.log("I heard" + hvacmessage);
   
    if(hvacmessage == "status") {

      abilities.coolmasternet.stat((d) => {

        var mesg = ""
        for(var did in d['devices']) {
          var thisd = d['devices'][did];
          if(thisd.status == "ON") {
            mesg += `*Unit ${thisd.id} is ${thisd.status}; ${thisd.mode} ${thisd.fan}; current temp ${thisd.temp}, setpoint ${thisd.setpoint}*\n`
          } else {
            mesg += `Unit ${thisd.id}: ${thisd.status}; current temp ${thisd.temp}\n`; 
          }
        }

        bot.reply(message, mesg);

      });

    } else {

      if(["on", "off", "temp", "allon", "alloff", "cool", "heat", "fan", "dry", "auto", "fspeed"].includes(hvacmessage.split(" ")[0])) {

        var hvac_prefix = hvacmessage.split(/\d+/)[0].trim();

        var hvac_commands = hvacmessage.split(",").map(function(d) {
           return hvac_prefix + " " + d.replace(/[^\d]+/g, "");
        });

        callback_chain_hvac_commands(bot, message, abilities, hvac_commands); 

      }
    }

 })

}

