const axios = require('axios')
require('dotenv').config()


const interval = (max, func)=> {
    var counter = 0
    var interval = setInterval(()=> {
        func(counter)
        counter++
        if(counter == max)
        {
            clearInterval(interval)
        }
    }, 4000)
}

const excludeNullFromArray = (array)=> {
    return array.filter((item)=> {
        return item.length > 0
    })
}

const lowerCase = (message)=> {
    return message.toLowerCase()
}

const registerUser = (username, password, facebookId, facebookToken)=> {
    let payload = {
        username,
        password,
        facebookId,
        facebookToken
    }
    axios.post(process.env.FIREBASE_DATABASE_URL + '/users.json', payload).then((result)=> {
        console.log(result)
    }).catch((error)=> {
        console.log(error)
    })
}

const loginUser = (username, password, callback)=> {
    axios.get(process.env.FIREBASE_DATABASE_URL + '/users.json').then((results)=> {
        let user = validateCredentials(username, password, Object.values(results.data))
        callback(user)
    }).catch((error)=> {
        console.log(error)
    })
}

const validateCredentials = (username, password, users)=> {
    return users.find((user)=> {
        if(user.username === username && user.password === password)
        {
            return user
        }
    })
}


module.exports = {
    interval,
    excludeNullFromArray,
    lowerCase,
    registerUser,
    loginUser
}
