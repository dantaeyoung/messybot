var Telnet = require('telnet-client')

class coolmasternet {
  constructor(config) {
    var self = this;
    this.params = {
        host: config.coolmasternet.ip,
        port: config.coolmasternet.port,
        shellPrompt: '>',
        timeout: 1500
    }
		this.config = config.coolmasternet;
    this.connection = new Telnet()
     
    this.connection.on('timeout', function() {
        console.log('socket timeout!')
        self.connection.end()
    })
     
    this.connection.on('close', function() {
        console.log('connection closed')
    })

  }

  send_message(cmd) {
    var self = this;

    var cmd = "off 202"

    self.connection.on('ready', function(prompt) {
      self.connection.exec(cmd, function(err, response) {
        console.log(response)
        self.connection.end()
      })
    })
    
    self.connection.connect(self.params)

  }

}

module.exports = coolmasternet;

