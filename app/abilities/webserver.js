// server.js

var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(config) {

    var slackcontroller = config.slack.controller;

    var webserver = express();
    // Parse request bodies
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));
    // Setup a static directory 'public', totally optional
    webserver.use(express.static('app/public'));

    webserver.on('error', console.log);
    webserver.listen(config.webserver.port, function() {
        console.log('Express webserver configured and listening!')
    });

    return webserver;
}

