var OZW = require('openzwave-shared');
var zwave = new OZW();

class zwave {
  constructor(config) {
    this.tty = config.openzwave.tty;
    var zwave = require("openzwave-shared")({
        ConsoleOutput: false
    });
  }

  connect() {
    zwave.connect(this.tty);
  }

  disconnect() {
    zwave.disconnect(this.tty);
  }


}

module.exports = zwave;
