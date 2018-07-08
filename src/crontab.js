const cron = require('node-cron')
// const { farm } = require('./services/farm_girls.js')

var run = ()=> {
    cron.schedule('*/10 * * * *', function(){
        console.log('running a task every 10 minutes');
        // farm(10)
    });
}

module.exports = run()
