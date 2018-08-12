const interval = (max, func)=> {
    var counter = 0
    var interval = setInterval(()=> {
        func()
        counter++
        if(counter == max)
        {
            clearInterval(interval)
        }
    }, 4000)
}


module.exports = {
    interval
}
