var Telnet = require('telnet-client')

class coolmasternet {
  constructor(config) {
    var self = this;
    this.params = {
        host: config.coolmasternet.ip,
        port: config.coolmasternet.port,
        shellPrompt: '>',
        timeout: 1500,
        execTimeout: 500,
        sendTimeout: 500
    }
		this.config = config.coolmasternet;
  }

  send_message(cmd, cb) {
    var self = this;

    this.connection = new Telnet()
     
    this.connection.on('timeout', function() {
        console.log('socket timeout!')
        self.connection.end()
    })
     
    this.connection.on('close', function() {
//        console.log('connection closed')
    })

    self.connection.on('ready', function(prompt) {
      self.connection.exec(cmd, function(err, response) {
        cb(response)
        self.connection.end()
      })
    })
    
    self.connection.connect(self.params)

  }

  stat(cb) {
  
    this.send_message("stat", (resp) => {
      var stat = {};
      stat['devices'] = {};
      for(var l of resp.trim().split("\n")) {
        if(l.trim() !== "OK") {
          var d = l.trim().split(/\s+/)
          stat['devices'][d[0]] = {
            "id": d[0],
            "status": d[1],
            "setpoint": d[2],
            "temp": d[3],
            "fan": d[4],
            "mode": d[5]
          }
        }
      }
      stat['raw'] = resp.trim();
      cb(stat);
    });
  }

}

module.exports = coolmasternet;

