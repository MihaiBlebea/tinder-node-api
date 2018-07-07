const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
const config = require('config')

const url = config.get('mongoDB.url');
const database = config.get('mongoDB.database');

// Setup
mongoose.Promise = global.Promise;
mongoose.plugin(mongoosePaginate);

mongoose.connect(url + '/' + database)

module.exports = mongoose
