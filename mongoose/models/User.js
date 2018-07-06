const connection = require('./../connect.js')

var User = connection.model('User', {
    first_name: {
        type: String,
        required: true
    },
    second_name: {
        type: String,
        required: true
    },
    fb_client_id: {
        type: String,
        required: true
    },
    fb_token: {
        type: String,
        required: true
    },
    tinder_token: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    }
})

module.exports = User
