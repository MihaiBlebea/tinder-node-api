// var tinder = require('tinder')
const tinder = require('./tinder-api')
var client = new tinder.TinderClient()

client.setAuthToken()
console.log('Tinder is authorized: ', client.isAuthorized())

module.exports = client
