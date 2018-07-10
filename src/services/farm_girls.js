const tinder = require('./../tinder.js')
const jsesc = require('jsesc')
const Girl = require('./../../mongoose/models/Girl.js')


var farm = (perRequest)=> {
    tinder.getRecommendations(perRequest, function(error, data) {
        if(error) throw error;

        data.results.map((girl)=> {
            var payload = {
                tinder_id: girl._id,
                name: jsesc(girl.name),
                bio: jsesc(girl.bio),
                birth_date: girl.birth_date,
                images: girl.photos
            }
            new Girl(payload).save().then((result)=> {
                console.log(`Farmed girl named: ${result.name}`)
            }).catch((error)=> {
                console.log(error)
            })
        })
    })
}

// Run script from command line
if(require.main === module)
{
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
}


module.exports = {
    farm: farm
}
