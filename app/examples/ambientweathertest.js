var config = require('../config/config');

console.log("=== ADDING ABILITIES");
var abilities = {};

console.log("= connect to AMBIENTWEATHER");
abilities.ambientweather = new (require('../abilities/ambientweather'))(config);

abilities.ambientweather.get_weather_slow((data) => {
  console.log(data);
});


