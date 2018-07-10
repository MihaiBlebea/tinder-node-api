const cron = require('node-cron')
const { farm } = require('./services/farm_girls.js')
const { autoLike } = require('./services/auto_like.js')


var farmGirlsCron = ()=> {
    cron.schedule('*/10 * * * *', function(){
        console.log('Farming girls every 10 minutes');
        farm(10)
    });
}

var autoLikeCron = ()=> {
    cron.schedule('* * * * *', function(){
        console.log('Running code');
        autoLike(10)
    });
}

var run = ()=> {
    // farmGirlsCron()
    // autoLikeCron()
}

module.exports = run()
