
var total = ['mere', 'pere', 'banane', 'portocale', 'lamai', 'gutui']
var count = 0
var interval = setInterval(()=> {
    console.log(total[count])
    count++
    if(count == total.length)
    {
        clearInterval(interval)
    }
}, 1000)
