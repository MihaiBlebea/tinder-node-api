const Girl = require('./../../mongoose/models/Girl.js')


var searchBio = (word, callback)=> {
    Girl.find().then((girls)=> {
        var found = []
        girls.filter((girl)=> {
            if(girl.bio.search(word) > -1)
            {
                found.push(girl)
            }
        })
        callback(found)
    }).catch((error)=> {
        console.log(error)
    })
}

if(require.main === module)
{
    var word = process.argv[2];
    searchBio(word, (result)=> {
        console.log(result)
    })
}

module.exports = searchBio
