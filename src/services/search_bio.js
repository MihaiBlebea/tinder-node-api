var girlModel = require('./../database/girl_model.js')

var searchBio = (word, callback)=> {
    girlModel.getAll((result)=> {
        var found = []
        result.filter((girl)=> {
            if(girl.bio.search(word) > -1)
            {
                found.push(girl)
            }
        })
        callback(found)
    })
}

if(require.main === module)
{
    var word = process.argv[2];
    searchBio(word, (result)=> {
        console.log(result)
    })
}
