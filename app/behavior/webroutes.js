module.exports = function(abilities) { 
  var webserver = abilities.webserver;
  webserver.get('/', function (req, res) {
    res.send('hello world')
  })
}
