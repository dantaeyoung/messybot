module.exports = function(config, abilities) { 
  abilities.webserver.get('/qrswitch/v1/:nodeid/:cmd', function (req, res) {
     resp = qrswitch_v1(req.params, config, abilities);
     res.send(resp);
  })
}

function qrswitch_v1(params, config, abilities) {
   var nodeid = params.nodeid;
   var cmd = params.cmd;

   var path =  "/rest/nodes/" + nodeid + "/CMD/";
   if(cmd.toLowerCase() == "on") { path += "DON"; }
   if(cmd.toLowerCase() == "off") { path += "DOF"; }
   abilities.isy.request(path, function(err, json) {
     if(!err) { 
       //abilities.slack.bot.send({
         //channel: config.slack.channel_main,
         //text: "Someone turned " + nodeid + " " + cmd.toLowerCase() + "!"
       //});
     }
   });
   return "v1" + nodeid + cmd;
}

