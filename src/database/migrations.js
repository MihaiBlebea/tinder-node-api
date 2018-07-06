var girls = require('./girl_model');
var images = require('./image_model');
var matches = require('./match_model');


var up = ()=> {
    girls.up()
    images.up()
    matches.up()
}

var down = ()=> {
    girls.down()
    images.down()
    matches.down()
}

if(require.main === module)
{
    (process.argv[0] === 'down') ? down() : up();
}

module.exports = {
    up,
    down
}
