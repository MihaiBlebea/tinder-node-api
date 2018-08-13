const express = require('express')
const router = express.Router()
const { getNew } = require('./../src/services/listen')
const { getAllMessages, excludeOwnMessages, isQuestion, parseConv, compare } = require('./../src/services/chat-bot')
const { excludeNullFromArray, lowerCase } = require('./../src/services/utils')


router.use('/tinder', require('./tinder'))

const message = "How old are you?"

router.get('/test', (request, response)=> {
    getAllMessages((conversations)=> {
        let parsedConv = []
        conversations.forEach((conversation)=> {
            if(parseConv(conversation).length > 0)
            {
                parsedConv = parsedConv.concat(parseConv(conversation))
            }
        })
        response.json(compare(message, parsedConv))
        // response.json(parsedConv)
    })
})

module.exports = router
