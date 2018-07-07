const express = require('express')
const config = require('config')
const jsesc = require('jsesc')
const cors = require('cors')
const bodyParser = require('body-parser')


const tinder = require('./src/tinder.js')
const crontab = require('./src/crontab.js')
const { authenticate } = require('./src/middlewares.js')
const Girl = require('./mongoose/models/Girl.js')
const User = require('./mongoose/models/User.js')

var app = express();

app.use(cors())
app.use(bodyParser.json())

// Auth to app routes //
app.post('/signup', (request, response)=> {
    var payload = {
        name: request.body.name,
        phone: request.body.phone,
        email: request.body.email,
        password: request.body.password,
    }
    var user = new User(payload)
    user.save().then(()=> {
        return user.generateJWT()
    }).then((token)=> {
        response.header('x-auth', token).json(user)
    }).catch((error)=> {
        response.json(error)
    })
})

app.get('/users/me', authenticate, (request, response)=> {
    response.json(request.user)
})

// Testing purpose //
app.get('/get', (request, response)=> {
    tinder.getRecommendations(10, function(error, data) {
        if(error) throw error;
        response.json(data)
    });
})

// Tnder routes //
app.get('/tinder-auth', (request, response)=> {
    var facebookUserId = config.get('facebook.facebookUserId')
    var facebookToken = config.get('facebook.facebookToken')
    tinder.authorize(facebookToken, facebookUserId, function() {
        var tinderToken = tinder.getAuthToken()
        response.send("Auth Done: " + tinderToken)
    });
})

app.get('/girls', (request, response)=> {
    const perPage = 20;
    var pageNumber = (request.query.page == null) ? 1 : request.query.page;
    Girl.paginate({}, { page: pageNumber, limit: perPage }).then((girls)=> {
         response.json(girls)
    }).catch((error)=> {
        console.log(error)
    })
})

app.get('/girl/:id', (request, response)=> {
    var tinder_id = request.params.id;
    if(id !== null && id !== undefined)
    {
        Girl.findOne({ tinder_id: tinder_id }).then((girl)=> {
            response.json(girl)
        }).catch((error)=> {
            console.log(error)
        })
    }
})

app.get('/news', (request, response)=> {
    tinder.getUpdates((error, result)=> {
        response.json(result)
    })
})

app.get('/history', (request, response)=> {
    tinder.getHistory(function(error, result) {
        response.json(result)
    })
})

app.get('/like/:id', (request, response)=> {
    var id = request.params.id;
    tinder.like(id, (error, result)=> {
        response.json(result)
    })
})

app.get('/pass/:id', (request, response)=> {
    var id = request.params.id;
    tinder.like(id, (error, result)=> {
        response.json(result)
    })
})

app.get('/user/:id', (request, response)=> {
    var id = request.params.id;
    tinder.getUser(id, (error, result)=> {
        response.json(result)
    })
})

app.get('/settings', (request, response)=> {
    tinder.getProfile((error, result)=> {
        response.json(result)
    })
})

app.get('/message/:match_id', (request, response)=> {
    var id = request.params.match_id;
    tinder.sendMessage(id, message, (error, result)=> {
        console.log(error)
        response.json(result)
    })
})

app.get('/account', (request, response)=> {
    tinder.getAccount((error, result)=> {
        console.log(error)
        response.json(result)
    })
})

app.get('/wait', (request, response)=> {
    tinder.getAccount((error, result)=> {
        console.log(error)
        response.json({
            likes: result.rating.likes_remaining,
            wait: result.rating.rate_limited_until
        })
    })
})



app.listen(3000, function() {
    console.log('Server running on 3000')
})
