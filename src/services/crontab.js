const cron = require('node-cron')
const { autoLike } = require('./auto-like')
const { chatbot, getTrainingData, updateStorageWithNewMessages } = require('./chat-bot')
const { updateChatBotData } = require('./firebase')
const { runTask } = require('./task')


const getDate = ()=> {
    return new Date().toString()
}

const runChatBot = ()=> {
    console.log('runChatBot started at ' + getDate())
    cron.schedule('*/10 * * * *', ()=> {
        chatbot()
        console.log('chatbot was run at ' + getDate())
    })
}

const runAutoLike = ()=> {
    console.log('runAutoLike started at ' + getDate())
    cron.schedule('0 * * * *', ()=> {
        autoLike(40)
    })
}

const runStoreMessages = ()=> {
    console.log('runStoreMessages started at ' + getDate())
    cron.schedule('0 * * * *', ()=> {
        updateStorageWithNewMessages(()=> {
            console.log('runStoreMessages was run at ' + getDate())
        })
    })
}

const runTasks = ()=> {
    console.log('runTasks started at ' + getDate())
    cron.schedule('* * * * *', ()=> {
        console.log('runTasks was run at ' + getDate())
        runTask((result)=> {
            console.log('runTasks was run at ' + getDate(), result)
        })
    })
}

module.exports = {
    runChatBot,
    runAutoLike,
    runStoreMessages,
    runTasks
}
