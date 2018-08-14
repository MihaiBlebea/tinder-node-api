const cron = require('node-cron')
const { autoLike } = require('./auto-like')
const { chatbot } = require('./chat-bot')


const runChatBot = ()=> {
    console.log('runChatBot started')
    cron.schedule('*/10 * * * *', ()=> {
        chatbot()
        console.log('chatbot was run')
    })
}

const runAutoLike = ()=> {
    console.log('runAutoLike started')
    cron.schedule('*/10 * * * *', ()=> {
        autoLike(10)
    })
}

module.exports = {
    runChatBot,
    runAutoLike
}
