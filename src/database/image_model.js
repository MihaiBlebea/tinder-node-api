var conn = require('./db_connection')

var up = ()=> {
    conn.query("CREATE TABLE IF NOT EXISTS `images`" +
               "(`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT," +
               " `girl_id` INT(10) NULL DEFAULT NULL," +
               " `tinder_image_id` VARCHAR(250) NULL DEFAULT NULL," +
               " `path` VARCHAR(250) NULL DEFAULT NULL," +
               " PRIMARY KEY (`id`))", (error, results, fields)=> {
        if(error) throw error;
        console.log(results)
    })
}

var down = ()=> {
    conn.query("DROP TABLE IF EXISTS `images`", (error, results, fields)=> {
        if(error) throw error;
        console.log(results)
    })
}

var insert = (payload, callback)=> {
    conn.query('INSERT INTO images SET ?', payload, function (error, results, fields) {
        if(error) throw error;
        callback(results)
    });
}

var getImgForGirl = (id, callback)=> {
    conn.query('SELECT * FROM images WHERE images.girl_id="' + id + '"', (error, results, fields)=> {
        if(error) throw error;
        console.log(results)
        callback(results)
    })
}

module.exports = {
    down,
    up,
    insert,
    getImgForGirl
}
