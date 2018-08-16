const { storeTask, getTasks } = require('./firebase')


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

const runTask = (taskName)=> {
    getTasks((tasks)=> {
        console.log(tasks)
    })
}


module.exports = {
    constructTaskObject,
    storeNewTask,
    runTask
}
