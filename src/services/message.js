const tinder = require('./../tinder')
require('dotenv').config()


const getMatches = (callback)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.getHistory((error, result)=> {
            if(error) throw error
            return callback(result.matches)
        })
    })
}

const getMatchName = (match)=> {
    return match.person.name
}

const insertName = (message, name)=> {
    var placeholder = '[name]'
    return message.includes(placeholder) ? message.replace(placeholder, name) : message
}

const getMatchByName = (matches, name)=> {
    return matches.filter((match)=> {
        if(match.person.name === name) return match
    })
}

const getMatchByUserId = (matches, id)=> {
    return matches.filter((match)=> {
        if(match.person._id === id) return match
    })[0]
}


const sendMessage = (match_id, message, callback)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.sendMessage(match_id, message, (error, result)=> {
            if(error) throw error
            callback(result)
        })
    })
}

const sendBroadcast = (message)=> {
    getMatches((matches)=> {
        interval(matches.length, ()=> {
            sendMessage(matches[counter].id, insertName(message, getMatchName(matches[counter])), ()=> {
                console.log(counter)
            })
        })
    })
}

const sendFirstMessage = (message)=> {
    getMatches((matches)=> {
        matches.filter((match)=> {
            if(match.messages.length === 0)
            {
                sendMessage(match.id, insertName(message, getMatchName(match)), ()=> {
                    console.log(counter)
                })
            }
        })
    })
}


module.exports = {
    getMatches,
    getMatchByName,
    getMatchByUserId,
    sendMessage,
    sendBroadcast,
    sendFirstMessage
}
