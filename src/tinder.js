var tinder = require('tinder');
var client = new tinder.TinderClient();
var config = require('config');

client.setAuthToken(config.get('tinderToken'))
console.log('Client is auth: ' + client.isAuthorized())

module.exports = client
