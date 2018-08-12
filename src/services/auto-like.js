const tinder = require('./../tinder')
const { sendMessage } = require('./message')
const { interval } = require('./utils')
require('dotenv').config()


const canLike = (callback)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.getAccount((error, result)=> {
            return (result.rating.rate_limited_until === undefined) ? callback(true) : callback(false)
        })
    })
}

const getProfiles = (number, callback)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.getRecommendations(number, (error, profiles)=> {
            if(error) throw error
            callback(profiles.results)
        })
    })
}

const getProfile = (id, callback)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.getUser(id, (error, profile)=> {
            if(error) throw error
            callback(profile)
        })
    })
}

const getProfileName = (profile)=> {
    return profile.name
}

const likeProfile = (id, callback)=> {
    tinder.authorize(process.env.FACEBOOK_TOKEN, process.env.FACEBOOK_ID, ()=> {
        tinder.like(id, (error, result)=> {
            if(error) throw error
            if(callback)
            {
                callback(result)
            }
        })
    })
}


const autoLike = (number)=> {
    canLike((result)=> {
        if(result === true)
        {
            getProfiles(number, (profiles)=> {
                interval(profiles.length, ()=> {
                    likeProfile(profiles[counter]._id, (result)=> {
                        if(result.match !== false)
                        {
                            getProfile(result.match.participants[1], (profile)=> {
                                let name = getProfileName(profile.results)
                                let message = 'Hey ' + name + '! How are you today?'
                                sendMessage(result.match._id, message, (result)=> {
                                    console.log(result)
                                })
                            })
                        } else {
                            console.log('Liked ' + profiles[counter].name + ' with id ' + profiles[counter]._id)
                        }
                    })
                })
            })
        } else {
            console.log('No more likes left for today')
        }
    })
}


module.exports = {
    canLike,
    getProfiles,
    likeProfile,
    autoLike
}
