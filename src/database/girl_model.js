var conn = require('./db_connection')

var up = ()=> {
    conn.query("CREATE TABLE IF NOT EXISTS `girls`" +
               "(`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT," +
               " `tinder_id` VARCHAR(250) NULL DEFAULT NULL," +
               " `name` VARCHAR(250) NULL DEFAULT NULL," +
               " `bio` MEDIUMTEXT NULL," +
               " `birth_date` VARCHAR(250) NULL DEFAULT NULL," +
               " `ping_time` VARCHAR(250) NULL DEFAULT NULL," +
               " `status` VARCHAR(250) NULL DEFAULT NULL," +
               " PRIMARY KEY (`id`))", (error, results, fields)=> {
        if(error) throw error;
        console.log(results)
    })
}

var down = ()=> {
    conn.query("DROP TABLE IF EXISTS `girls`", (error, results, fields)=> {
        if(error) throw error;
        console.log(results)
    })
}

var insert = (payload, callback)=> {
    conn.query('INSERT INTO girls SET ?', payload, (error, results, fields)=> {
        if(error) throw error;
        callback(results)
    });
}

var getAll = (callback)=> {
    var sql = `SELECT girls.id, girls.tinder_id, girls.name, girls.bio, girls.birth_date, girls.status FROM girls`;
    conn.query(sql, (error, results, fields)=> {
        if(error) throw error;
        var uniqGirls = []
        results.filter((row)=> {
            var idGirls = uniqGirls.map((item)=> {
                return item.id
            })
            if(!idGirls.includes(row.id))
            {
                uniqGirls.push(row)
            }
        })
        callback(uniqGirls)
    })
}

var countRows = (callback)=> {
    var sql = `SELECT COUNT(*) AS rows FROM girls`;
    conn.query(sql, (error, results, fields)=> {
        if(error) throw error;
        callback(results)
    })
}

var getPaginated = (perPage, offset, callback)=> {
    var sql = `SELECT girls.id, girls.tinder_id, girls.name, girls.bio, girls.birth_date, girls.status,
               images.path AS image
               FROM (SELECT * FROM girls ORDER BY girls.id DESC LIMIT ${perPage} OFFSET ${offset}) AS girls
               LEFT JOIN images
               ON girls.id = images.girl_id`;
    conn.query(sql, (error, results, fields)=> {
                    if(error) throw error;
                    console.log(fields)
                    var uniqGirls = []
                    results.filter((row)=> {
                        var idGirls = uniqGirls.map((item)=> {
                            return item.id
                        })
                        if(!idGirls.includes(row.id))
                        {
                            uniqGirls.push(row)
                        }
                    })
                    callback(uniqGirls)
                })
}

var get = (id, callback)=> {
    conn.query('SELECT * FROM girls WHERE girls.tinder_id="' + id + '" LIMIT 1', (error, results, fields)=> {
        if(error) throw error;
        callback(results[0])
    })
}

module.exports = {
    down,
    up,
    insert,
    getAll,
    countRows,
    getPaginated,
    get
}
