# Messybot

Messybot is the opinionated interface for a building. 

### Requirements:

- A Raspberry Pi [(setup instructions)](https://github.com/dantaeyoung/messybot/blob/master/pi_setup.md)
- a Space

### Abilities supported

- Slack
- An Express HTML server
- An HDMI monitor
- An Art-Net DMX controller
- [OpenZWave](http://www.openzwave.com/)
- [Isy994 Z-wave controller](https://www.universal-devices.com/residential/isy994izw-series/) and Z-wave devices
- [CoolMasterNet](https://coolautomation.com/products/coolmasternet/) commercial HVAC controller
- [Nest Cam](https://nest.com/cameras/) (formerly Dropcam)
- [Ambient Weather](https://www.ambientweather.com/) station

### Installation:

- Copy `config.js.example` to `config.js`, and edit the config to match.
- Copy `messybot.js.example` to `messybot.js`, and uncomment/comment lines as needed.
- Install dependencies with `npm install`
- Test with `npm start`
- Install as a system service with `pm2 start app/messybot.js`
- Make sure that pm2 is running as a [service](http://pm2.keymetrics.io/docs/usage/startup/#generating-a-startup-script) on boot.
- Save scripts for startup: `pm2 save`


### App structure

- `app/messybot.js` initializes execution.
- Abilities are in the `app/abilities` directory. Controls such as Sonos or other things could be added here.
- Behaviors are in the `app/behaviors` directory.

#### Abilities

Abilities do not depend on any other abilities. They standalone and function independently. An ability usually is a lightweight wrapper around a service - Sonos, Spotify, etc.

Where in doubt, don't add layers of abstraction. No ORMs, interfaces, etc. 

#### Behaviors

- Behaviors wrangle together a mix of abilities into a behavior. For example: E.g, if you send a Slack message, a z-wave light turns on and the hdmi monitor turns on, etc.
- Since behaviors are pretty messily connected to abilities (i.e. there's no clear separation of behaviors and abilities), it's best to make as many small behaviors as possible that have specific uses, and to let each use 'turn on' those behaviors as needed.
- Example behaviors: 
  - `ask_about_the_weather.js`: When someone sends a `@messybot weather` message in Slack, get data from a rooftop weather station and post in Slack
  - `banter.js`: Some slight banter.
  - `monitor_control.js`: Turn HDMI monitor on/off from Slack
  - `qrswitches.js`: Use QR codes to execute behaviors
  - `slack_control_coolmasternet.js`: Control HVAC system with CoolMasterNet
  - `webroutes.js`: Example webserver
  - `zwave.js`: Control Zwave system through Isy994


### Security

Currently Messybot exposes a lot of services and has no access control. Use at your own risk! It's a messy system, after all.


