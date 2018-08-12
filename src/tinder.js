var tinder = require('tinder');
var client = new tinder.TinderClient();

client.setAuthToken(process.env.TINDER_TOKEN)
console.log('Tinder is authorized: ', client.isAuthorized())

module.exports = client
