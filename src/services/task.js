const { storeTask, getTasks } = require('./firebase')
const { sendMessage } = require('./message')
const moment = require('moment')


const constructTaskObject = (name, time, message, recipients)=> {
    if(!Array.isArray(recipients)) throw 'The recipients should be an array'
    // if(typeof time.getHours !== 'function') throw 'Time shoud be a time object'
    if(typeof message !== 'string') throw 'Message should be a string'
    if(typeof name !== 'string') throw 'Name should be a string'
    return {
        name,
        time,
        message,
        recipients
    }
}

const storeNewTask = (name, time, message, recipients)=> {
    storeTask(constructTaskObject(name, time, message, recipients))
}

const matchTime = (time)=> {
    if(!time.includes(':')) throw 'Time format is not supported, please add hour:minute'
     let taskTime = moment()
     taskTime.hour(time.split(':')[0])
     taskTime.minute(time.split(':')[1])
     return moment().isSame(taskTime, 'minute')
}

const runTask = (callback)=> {
    getTasks((tasks)=> {
        tasks.map((task)=> {
            if(matchTime(task.time))
            {
                task.recipients.map((recipient)=> {
                    sendMessage(recipient, task.message, (result)=> {
                        callback(result)
                    })
                })
            }
        })
    })
}


module.exports = {
    constructTaskObject,
    storeNewTask,
    runTask
}
