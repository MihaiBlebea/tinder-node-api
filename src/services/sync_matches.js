const tinder = require('./../tinder.js')
const Match = require('./../../mongoose/models/Match.js')

var syncMatches = (callback)=> {
    tinder.getHistory(function(error, result) {
        if(error) throw error
        result.matches.map((match)=> {
            var payload = {
                tinder_id: match.person._id,
                match_id: match.id
            }
            new Match(payload).save().then((result)=> {
                console.log(result)
            }).catch((error)=> {
                console.log(error)
            })
        })

        callback()
    })
}

if(require.main === module)
{
    syncMatches(()=> {
        console.log('Sync matches done')
    })
}

module.exports = syncMatches
