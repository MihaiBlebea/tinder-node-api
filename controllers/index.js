const express = require('express')
const router = express.Router()
const { getNew } = require('./../src/services/listen')
const { getResponseToQuestion, getNewMessages, getPartnerLastMessage } = require('./../src/services/chat-bot')
const { excludeNullFromArray, lowerCase } = require('./../src/services/utils')
const { sendMessage } = require('./../src/services/message')

router.use('/tinder', require('./tinder'))

const message = "Where are you from?"

router.get('/test', (request, response)=> {
    getResponseToQuestion(message, (result)=> {
        response.json(result)
    })
})

module.exports = router
