const tinder = require('./../tinder')
require('dotenv').config()


const getNew = (callback)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.getUpdates((error, result)=> {
            callback(result)
        })
    })
}


module.exports = {
    getNew
}
