
class slack {
  constructor(config) {
    // CONNECT SLACK
    var Botkit = require('botkit');
    this.controller = Botkit.slackbot();
    this.bot = this.controller.spawn({
        token: config.slack.api_token
    }).startRTM();
  }
}

module.exports = slack;

