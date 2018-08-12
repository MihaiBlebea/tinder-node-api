const express = require('express')
const router = express.Router()
const { getMatches, sendMessage, sendFirstMessage, getMatchByUserId } = require('./../src/services/message')
const { autoLike, canLike } = require('./../src/services/auto-like')


router.use('/tinder', require('./tinder'))

router.get('/test', (request, response)=> {
    sendFirstMessage('Hello')
})

module.exports = router
