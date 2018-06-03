var config = require('../config/config');

console.log("=== ADDING ABILITIES");
var abilities = {};

console.log("= connect to OPENZWAVE");
abilities.openzwave = new (require('../abilities/openzwave'))(config);

/*
abilities.openzwave.apicall("/snapshot_url", function(res) { 
  console.log(res);
});
abilities.openzwave.apicall("/last_event/image_url", function(res) { 
  console.log(res);
});

*/
