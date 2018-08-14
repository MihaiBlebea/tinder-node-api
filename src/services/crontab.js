const cron = require('node-cron')
const { autoLike } = require('./auto-like')
const { chatbot, getTrainingData } = require('./chat-bot')
const { updateChatBotData } = require('./firebase')


const runChatBot = ()=> {
    console.log('runChatBot started')
    cron.schedule('*/10 * * * *', ()=> {
        chatbot()
        console.log('chatbot was run')
    })
}

const runAutoLike = ()=> {
    console.log('runAutoLike started')
    cron.schedule('0 * * * *', ()=> {
        autoLike(10)
    })
}

const runStoreMessages = ()=> {
    console.log('runStoreMessages started')
    cron.schedule('0 * * * *', ()=> {
        updateChatBotData(['Serban', 'Mihai'])
    })
}

module.exports = {
    runChatBot,
    runAutoLike
}
