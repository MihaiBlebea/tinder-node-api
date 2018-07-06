const Girl = require('./models/Girl.js')

var Gina = new Girl({ tinder_id: '34asdasdasd', name: 'Gina' })

Gina.save().then((result)=> {
    console.log(result)
}).catch((error)=> {
    console.log(error)
})
