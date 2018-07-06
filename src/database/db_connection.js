var mysql = require('mysql');

var connection = mysql.createConnection({
    port : 3306,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'db_node_tinder'
});

module.exports = connection
