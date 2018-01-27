


class slack {

  constructor(config) {
   // CONNECT SLACK
    var Botkit = require('botkit');

    this.controller = Botkit.slackbot();
    this.bot = this.controller.spawn({
        token: config.slack.api_token
    });

		var self = this;
		this.controller.on('rtm_close', function(bot, err) {
				self.start_rtm();
		});

    this.start_rtm();
  }

	start_rtm() {
		var self = this;
    this.bot.startRTM(function(err,bot,payload) {
			if (err) {
					console.log('Failed to start RTM')
					return setTimeout(self.start_rtm, 60000);
			}
			console.log("RTM started!");
		});
	}

}

module.exports = slack;

