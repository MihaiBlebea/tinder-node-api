const cron = require('node-cron')
const { farm } = require('./services/farm_girls.js')
const { autoLike } = require('./services/auto_like.js')


var farmGirlsCron = ()=> {
    cron.schedule('*/10 * * * *', ()=> {
        farm(10)
    })
}

var autoLikeCron = ()=> {
    cron.schedule('* * * * *', ()=> {
        autoLike(10)
    })
}

var run = ()=> {
    // farmGirlsCron()
    // autoLikeCron()
}

module.exports = run()
