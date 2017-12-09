# Messybot

Messybot is the opinionated interface for a building. 

### Requirements:

- a Space
- a Slack group
- Isy994 Z-wave controller and devices
- A Raspberry Pi

### Installation:

- Copy `config.js.example` to `config.js`, and edit the config to match.
- Test with `npm start`
- Install with `pm2 start messybot --script app/messybot.js`
- Make sure that pm2 is running as a [service](http://pm2.keymetrics.io/docs/usage/startup/#generating-a-startup-script) on boot.

