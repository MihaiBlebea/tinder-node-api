const tinder = require('./../tinder.js')
const Match = require('./../../mongoose/models/Match.js')
const Girl = require('./../../mongoose/models/Girl.js')


var sendBroadcast = (message)=> {
    Match.find().then((matches)=> {
        var girlsId = matches.map((match)=> {
            return match.match_id;
        })

        var count = 0
        var interval = setInterval(()=> {
            tinder.sendMessage(girlsId[count], message, (error, result)=> {
                console.log(result)
                console.log(count)
            })
            count++
            if(count == girlsId.length)
            {
                clearInterval(interval)
            }
        }, 4000)
    }).catch((error)=> {
        console.log(error)
    })
}


if(require.main === module)
{
    var message = process.argv[2];
    sendBroadcast(message, (result)=> {
        console.log(result)
    })
}

module.exports = sendBroadcast
