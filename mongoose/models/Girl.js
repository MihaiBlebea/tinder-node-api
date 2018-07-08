const connection = require('./../connect.js')

var GirlSchema = new connection.Schema({
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


var Girl = connection.model('Girl', GirlSchema)

module.exports = Girl
