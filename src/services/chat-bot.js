const similarity = require('string-similarity')
const tinder = require('./../tinder')
const { sendMessage } = require('./message')
require('dotenv').config()


const getAllMessages = (callback)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.getHistory(function(error, result) {
            if(error) throw error
            callback(result.matches.map((match)=> {
                return match.messages
            }))
        })
    })
}

const getNewMessages = (callback)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.getUpdates((error, result)=> {
            if(error) throw error
            callback(result.matches.map((match)=> {
                return match.messages
            }))
        })
    })
}

const getResponseToQuestion = (message, callback)=> {
    // getAllMessages((conversations)=> {
    //     let parsedConv = []
    //     conversations.forEach((conversation)=> {
    //         if(parseConv(conversation).length > 0)
    //         {
    //             parsedConv = parsedConv.concat(parseConv(conversation))
    //         }
    //     })
    //     callback(compare(message, parsedConv))
    // })
    getTrainingData((messages)=> {
        callback(compare(message, messages))
    })
}

const getTrainingData = (callback)=> {
    getAllMessages((conversations)=> {
        let parsedConv = []
        conversations.forEach((conversation)=> {
            if(parseConv(conversation).length > 0)
            {
                parsedConv = parsedConv.concat(parseConv(conversation))
            }
        })
        callback(parsedConv)
    })
}

const getPartnerLastMessage = (conversation)=> {
    for(let i = conversation.length - 1; i >= 0; i--)
    {
        if(conversation[i].to === process.env.TINDER_ID && isQuestion(conversation[i]) === true)
        {
            return conversation[i]
        }
    }
}

const isQuestion = (messageObj)=> {
    return messageObj.message.includes('?')
}

const excludeOwnMessages = (messages)=> {
    return messages.filter((message)=> {
        if(message.from !== process.env.TINDER_ID)
        {
            return message
        }
    })
}

const parseConv = (conversation)=> {
    let result = []
    let firstMessage = 0
    for(let i = 0; i < conversation.length; i++)
    {
        if(partnerMessage(conversation[i]))
        {
            firstMessage = i
        }

        if(firstMessage !== 0 && firstMessage < i && ownMessage(conversation[i]))
        {
            result.push({
                question: conversation[firstMessage].message,
                answer: conversation[i].message
            })
            firstMessage = 0
        }
    }
    return result
}

const partnerMessage = (message)=> {
    return (message.from === process.env.TINDER_ID) ? false : true
}

const ownMessage = (message)=> {
    return (message.from === process.env.TINDER_ID) ? true : false
}

const compare = (message, messages)=> {
    let result = {}
    for(let i = 0; i < messages.length; i++)
    {
        let score = similarity.compareTwoStrings(message, messages[i].question)
        if(i > 0)
        {
            if(result.score < score)
            {
                result = {
                    score: score,
                    message: message,
                    question: messages[i].question,
                    answer: messages[i].answer
                }
            }
        } else {
            result = {
                score: score,
                message: message,
                question: messages[i].question,
                answer: messages[i].answer
            }
        }
    }
    return result
}

const chatbot = ()=> {
    getNewMessages((conversations)=> {
        conversations.map((conversation)=> {
            let lastMessage = getPartnerLastMessage(conversation)
            if(lastMessage)
            {
                getResponseToQuestion(lastMessage.message, (result)=> {
                    sendMessage(lastMessage.match_id, result.answer, (result)=> {
                        console.log(result)
                    })
                })
            }
        })
    })
}

module.exports = {
    getAllMessages,
    getNewMessages,
    getResponseToQuestion,
    getPartnerLastMessage,
    getTrainingData,
    parseConv,
    compare,
    chatbot
}
