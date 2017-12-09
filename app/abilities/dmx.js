var DMX = require('dmx');

class dmx {
  constructor(config) {
    this.A = DMX.Animation;
    this.dmx = new DMX();
    this.universe = this.dmx.addUniverse('ppnyuniverse', 'artnet', config.dmx.addr);
  }

  // TODO: add ability to set specific DMX values.
}

module.exports = dmx;
