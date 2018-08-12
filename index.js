const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const tinder = require('./src/tinder.js')
// const crontab = require('./src/crontab.js')


var app = express();

app.use(cors())
app.use(bodyParser.json())

// Routes
app.use(require('./controllers'))


app.listen(3000, function() {
    console.log('Server running on 3000')
})
