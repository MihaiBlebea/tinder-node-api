const tinder = require('./../tinder.js')

var autoLike = (perRequest)=> {
    tinder.getAccount((error, result)=> {
        if(error) { console.log('There was an error') }
        if(result.rating.rate_limited_until === undefined)
        {
            tinder.getRecommendations(perRequest, (error, girls)=> {
                if(error) { console.log('There was an error') }
                girls.results.map((girl)=> {
                    tinder.like(girl._id, (error, result)=> {
                        if(error)
                        {
                            console.log('There was an error')
                        } else {
                            if(result.math !== undefined)
                            {
                                var tinder_id = result.match.participants[1]
                                var match_id = result.match._id
                                tinder.getUser(tinder_id, (error, user)=> {
                                    if(error) { console.log('There was an error') }

                                    var message = `Hey ${user.name}! I was just browsing your profile and couldn't resist
                                    swiping right on you. I still can't decide if I was charmed more by your smile or by your eyes.
                                    What are you up to? I would like to take you out for a date, maybe coffee ? :) :) :)`

                                    tinder.sendMessage(match_id, message, (error, result)=> {
                                        if(error) { console.log('There was an error') }
                                        console.log('Ice breaker message sent')
                                    })
                                })
                            }
                            console.log(result)
                        }
                    })
                })
            })
        }
    })
}

module.exports = {
    autoLike
}
