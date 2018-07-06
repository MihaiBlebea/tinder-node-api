var tinder = require('./../tinder.js');
var matchModel = require('./../database/match_model.js')

tinder.getHistory(function(error, result) {
    var matches = result.matches;
    matches.map((match)=> {
        matchModel.getByGirl(match.person._id, (result)=> {
            if(result.length == 0)
            {
                matchModel.insert({
                    match_id: match.id,
                    tinder_id: match.person._id
                }, (res)=> {
                    console.log(res)
                })
            }
        })
    })
})
