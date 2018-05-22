var config = require('../config/config');

console.log("=== ADDING ABILITIES");
var abilities = {};

console.log("= connect to coolmasternet");
abilities.coolmasternet = new (require('../abilities/coolmasternet'))(config);


abilities.coolmasternet.stat((resp) => {
  console.log(resp);
});


