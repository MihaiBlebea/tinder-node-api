const express = require('express')
const tinder = require('./../src/tinder')
const router = express.Router()


router.get('/auth', (request, response)=> {
    tinder.authorize(process.env.FACEBOOK_ID, process.env.FACEBOOK_TOKEN, function() {
        let tinderToken = tinder.getAuthToken()
        response.send("Auth Done: " + tinderToken)
    });
})

router.get('/is-auth', (request, response)=> {
    response.json(tinder.isAuthorized())
})

router.get('/fetch', (request, response)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.getRecommendations(20, (error, data)=> {
            console.log(error)
            if(data !== null)
            {
                response.json(data.results)
            }
        })
    })
})

router.get('/user/:id', (request, response)=> {
    var tinder_id = request.params.id;
    tinder.getUser(tinder_id, (error, girl)=> {
        if(error) throw error
        response.json(girl)
    })
})

router.get('/news', (request, response)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.getUpdates((error, result)=> {
            if(error) throw error
            response.json(result)
        })
    })
})

router.get('/history', (request, response)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.getHistory(function(error, result) {
            response.json(result)
        })
    })
})

router.get('/like/:id', (request, response)=> {
    var id = request.params.id
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.like(id, (error, result)=> {
            response.json(result)
        })
    })
})

router.get('/pass/:id', (request, response)=> {
    var id = request.params.id
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.pass(id, (error, result)=> {
            response.json(result)
        })
    })
})

router.get('/settings', (request, response)=> {
    tinder.getProfile((error, result)=> {
        response.json(result)
    })
})

router.get('/message/:match_id', (request, response)=> {
    var id = request.params.match_id
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.sendMessage(id, message, (error, result)=> {
            console.log(error)
            response.json(result)
        })
    })
})

router.get('/account', (request, response)=> {
    tinder.getAccount((error, result)=> {
        console.log(error)
        response.json(result)
    })
})

router.get('/wait', (request, response)=> {
    tinder.getAccount((error, result)=> {
        console.log(error)
        if(result !== null)
        {
            response.json({
                likes: result.rating.likes_remaining,
                wait: result.rating.rate_limited_until
            })
        }
    })
})

module.exports = router
