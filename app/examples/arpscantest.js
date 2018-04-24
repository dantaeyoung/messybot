var config = require('../config/config');

console.log("=== ADDING ABILITIES");
var abilities = {};

console.log("= connect to ARPSCAN");
abilities.arpscan = new (require('../abilities/arpscan'))(config);

abilities.arpscan.simplescan(function(res) { 
  var addresses = [...new Set(res.map(x => x['mac']))]
  console.log(addresses);
});

