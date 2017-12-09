// server.js

var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(config, abilities) {

    var slackcontroller = config.slack.controller;
    var isy = abilities.isy;

    var webserver = express();
    // Parse request bodies
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));
    // Setup a static directory 'public', totally optional
    webserver.use(express.static('public'));

    // You can pass in whatever hostname you want as the second argument
    // of the express listen function, it defaults to 0.0.0.0 aka localhost 
    webserver.listen(config.webserver.port,  null, function() {
        console.log('Express webserver configured and listening!')
    });

    return webserver;
}

