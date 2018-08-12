const cron = require('node-cron')
const { autoLike } = require('./services/auto-like')


var farmGirlsCron = ()=> {
    cron.schedule('*/10 * * * *', ()=> {
        //
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
