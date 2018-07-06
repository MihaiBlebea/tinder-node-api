const connection = require('./../connect.js')

var Match = connection.model('Match', {
    tinder_id: {
        type: String,
        required: true
    },
    match_id: {
        type: String,
        required: true
    }
})

module.exports = Match
