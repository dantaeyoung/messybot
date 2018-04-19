var request = require('request');
var xml2js = require("xml2js");
var axios = require('axios');
//var simpleoauth2 = require('simple-oauth2');

class nestcam {
  constructor(config) {
		this.config = config.nestcam;
  }

  apicall(endpoint, cb) {
    // example endpoint = "/snapshot_url"
    // example endpoint = "/last_event/start_time"
    
		var self = this;
		var url = "https://developer-api.nest.com/devices/cameras/" + self.config.device_id +  endpoint;
		axios({
				method: 'get',
				url: url,
				headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + self.config.accesstoken,
				}
		}).then(function (response) {
			cb(response);
		}).catch((err) => {
			 console.log(err)
		});

  }

}

module.exports = nestcam;

