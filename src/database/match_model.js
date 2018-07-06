var conn = require('./db_connection')

var up = ()=> {
    conn.query("CREATE TABLE IF NOT EXISTS `matches`" +
               "(`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT," +
               " `match_id` VARCHAR(250) NULL DEFAULT NULL," +
               " `tinder_id` VARCHAR(250) NULL DEFAULT NULL," +
               " PRIMARY KEY (`id`))", (error, results, fields)=> {
        if(error) throw error;
        console.log(results)
    })
}

var down = ()=> {
    conn.query("DROP TABLE IF EXISTS `matches`", (error, results, fields)=> {
        if(error) throw error;
        console.log(results)
    })
}

var insert = (payload, callback)=> {
    conn.query('INSERT INTO matches SET ?', payload, (error, results, fields)=> {
        if(error) throw error;
        callback(results)
    })
}

var get = (callback)=> {
    conn.query('SELECT * FROM matches', (error, results, fields)=> {
        if(error) throw error;
        callback(results)
    })
}

var getByGirl = (id, callback)=> {
    conn.query('SELECT * FROM matches WHERE matches.tinder_id = "' + id + '"', (error, results, fields)=> {
        if(error) throw error;
        callback(results)
    })
}

module.exports = {
    up,
    down,
    insert,
    get,
    getByGirl
}
