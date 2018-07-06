var tinder = require('tinder');
var client = new tinder.TinderClient();
var config = require('config');


client.setAuthToken(config.get('tinderToken'))

module.exports = client
