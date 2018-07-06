var tinder = require('./../tinder.js');
var matchModel = require('./../database/match_model.js')

matchModel.get((result)=> {
    if(result.length > 0)
    {
        var girls = result.map((match)=> {
            return match.match_id;
        })
        var count = 0
        var message = "Do you want to meet for a coffee in London?"
        var interval = setInterval(()=> {
            tinder.sendMessage(girls[count], message, (error, result)=> {
                console.log(result)
                console.log(count)
            })
            count++
            if(count == girls.length)
            {
                clearInterval(interval)
            }
        }, 4000)
    }
})
