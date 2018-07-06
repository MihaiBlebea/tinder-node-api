const express = require('express')
const config = require('config')
const jsesc = require('jsesc')
const cors = require('cors')


const tinder = require('./src/tinder.js')
const crontab = require('./src/crontab.js')
const Girl = require('./mongoose/models/Girl.js')

var girl = require('./src/database/girl_model')
var image = require('./src/database/image_model')

var app = express();

app.use(cors())

// app.get('/get', (request, response)=> {
//     tinder.getRecommendations(10, function(error, data) {
//         if(error) throw error;
//
//         data.results.map((item)=> {
//             girl.insert({
//                 tinder_id: item._id,
//                 name: jsesc(item.name),
//                 bio: jsesc(item.bio),
//                 birth_date: item.birth_date,
//                 ping_time: item.ping_time
//             }, (result)=> {
//                 item.photos.map((img)=> {
//                     image.insert({
//                         girl_id: result.insertId,
//                         tinder_image_id: img.id,
//                         path: img.url
//                     }, (imageResult)=> {
//                         console.log(imageResult)
//                     })
//                 })
//             })
//         })
//         response.json(data)
//     });
// })

app.get('/auth', (request, response)=> {
    var facebookUserId = config.get('facebook.facebookUserId')
    var facebookToken = config.get('facebook.facebookToken')
    tinder.authorize(facebookToken, facebookUserId, function() {
        var tinderToken = tinder.getAuthToken()
        response.send("Auth Done: " + tinderToken)
    });
})

app.get('/girls', (request, response)=> {
    var perPage = 20;
    var page = request.query.page
    if(page == null || page == undefined)
    {
        page = 0
    }
    var offset = perPage * page
    girl.countRows((count)=> {
        girl.getPaginated(perPage, offset, (results)=> {
            var pages = (count[0].rows % perPage == 0) ? Math.floor(count[0].rows / perPage) : Math.floor(count[0].rows / perPage) + 1;
            response.json({
                girls: results,
                paginate: {
                    rows: count[0].rows,
                    pages: pages
                }
            })
        })
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
        // girl.get(id, (result)=> {
        //     image.getImgForGirl(result.id, (imgs)=> {
        //         response.json({
        //             girl: result,
        //             images: imgs
        //         })
        //     })
        // })
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
