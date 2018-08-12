const express = require('express')
const router = express.Router()
const { getNew } = require('./../src/services/listen')


router.use('/tinder', require('./tinder'))

router.get('/test', (request, response)=> {
    const func = (x)=> {
        return new Promise(function(resolve, reject) {
            if(x > 10)
            {
                resolve('Is greater then 10')
            } else {
                reject('Is less then 10')
            }
        });
    }
    // let tinderApi = new TinderApi('token')
    // tinderApi.auth(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, (results)=> {
    //     response.json(results)
    // })
    getNew((result)=> {
        response.json(result)
    })
    // func(11).then((result)=> {
    //     response.send(result)
    // }).catch((error)=> {
    //     response.send(error)
    // })
})

module.exports = router
