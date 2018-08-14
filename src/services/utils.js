const axios = require('axios')
require('dotenv').config()


const interval = (max, func)=> {
    var counter = 0
    var interval = setInterval(()=> {
        func(counter)
        counter++
        if(counter == max)
        {
            clearInterval(interval)
        }
    }, 4000)
}

const excludeNullFromArray = (array)=> {
    return array.filter((item)=> {
        return item.length > 0
    })
}

const lowerCase = (message)=> {
    return message.toLowerCase()
}

const storeChatBotData = (payload)=> {
    axios.post(process.env.FIREBASE_DATABASE_URL + '/chatbot.json', payload).then((result)=> {
        console.log(result)
    }).catch((error)=> {
        console.log(error)
    })
}

const getChatBotData = (callback)=> {
    axios.get(process.env.FIREBASE_DATABASE_URL + '/chatbot.json').then((result)=> {
        callback(Object.values(result.data))
    }).catch((error)=> {
        console.log(error)
    })
}


module.exports = {
    interval,
    excludeNullFromArray,
    lowerCase,
    storeChatBotData,
    getChatBotData
}
