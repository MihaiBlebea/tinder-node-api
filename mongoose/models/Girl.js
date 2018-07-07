const connection = require('./../connect.js')

var Girl = connection.model('Girl', {
    tinder_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    birth_date: {
        type: String,
        required: true
    },
    images: {
        type: Array
    },
    liked: {
        type: Boolean,
        default: false
    }
})

module.exports = Girl
