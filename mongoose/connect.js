const mongoose = require('mongoose');
const config = require('./../config/default.json').mongoDB

const url = config.url;
const database = config.database;

mongoose.Promise = global.Promise;

mongoose.connect(url + '/' + database)

module.exports = mongoose
