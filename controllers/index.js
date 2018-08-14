const express = require('express')
const router = express.Router()
const { getNew } = require('./../src/services/listen')
const { getResponseToQuestion, getNewMessages, getPartnerLastMessage } = require('./../src/services/chat-bot')
const { excludeNullFromArray, lowerCase } = require('./../src/services/utils')
const { sendMessage } = require('./../src/services/message')

router.use('/tinder', require('./tinder'))

const message = "Hey...um I think despicable me... you?"

router.get('/test', (request, response)=> {
    // getNewMessages((conversations)=> {
    //     conversations.map((conversation)=> {
    //         let lastMessage = getPartnerLastMessage(conversation)
    //         if(lastMessage)
    //         {
    //             getResponseToQuestion(lastMessage.message, (result)=> {
    //                 sendMessage(lastMessage.match_id, result.answer)
    //             })
    //         }
    //     })
    //     // response.json(conversations)
    // })
    getResponseToQuestion(message, (result)=> {
        response.json(result)
    })
})

module.exports = router
