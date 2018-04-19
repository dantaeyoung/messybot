var config = require('./config/config');

console.log("=== ADDING ABILITIES");
var abilities = {};

console.log("= connect to NESTCAM");
abilities.nestcam = new (require('./abilities/nestcam'))(config);


abilities.nestcam.apicall("/snapshot_url", function(res) { 
  console.log(res);
});
abilities.nestcam.apicall("/last_event/image_url", function(res) { 
  console.log(res);
});
