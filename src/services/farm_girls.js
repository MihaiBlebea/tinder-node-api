var tinder = require('./../tinder.js');
var jsesc = require('jsesc');
var girlModel = require('./../database/girl_model.js')
var imageModel = require('./../database/image_model.js')

var farm = (perRequest)=> {
    tinder.getRecommendations(perRequest, function(error, data) {
        if(error) throw error;
        data.results.map((girl)=> {
            girlModel.get(girl._id, (result)=> {
                if(result == undefined)
                {
                    girlModel.insert({
                        tinder_id: girl._id,
                        name: jsesc(girl.name),
                        bio: jsesc(girl.bio),
                        birth_date: girl.birth_date,
                        ping_time: girl.ping_time
                    }, (result)=> {
                        console.log(result)
                        girl.photos.map((img)=> {
                            imageModel.insert({
                                girl_id: result.insertId,
                                tinder_image_id: img.id,
                                path: img.url
                            }, (imageResult)=> {
                                // console.log(imageResult)
                            })
                        })
                    })
                }
            })
        })
    })
}

var count = 0
var max = 10
var interval = setInterval(()=> {
    console.log('Farm batch ' + count)
    farm(10)

    count++
    if(count == max)
    {
        clearInterval(interval)
    }
}, 10000)
