module.exports = function(config, abilities) { 

  var webserver = abilities.webserver;
  webserver.get('/', function (req, res) {
    res.send('hello world')
//    abilities.slack.bot.send({ channel: config.slack.channel_main, text: "ho"});
  })

}
