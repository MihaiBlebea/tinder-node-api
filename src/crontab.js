const cron = require('node-cron');

var run = ()=> {
    cron.schedule('* * * * *', function(){
      console.log('running a task every minute');
    });
}

module.exports = run()
