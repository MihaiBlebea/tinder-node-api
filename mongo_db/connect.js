const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'tinderDB';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    if(err) throw err;
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // db.collection('Girls').insertOne({ name: 'Gina' }, (error, result)=> {
    //     if(error) throw error;
    //     console.log(result.ops)
    // })
    db.collection('Girls').find().toArray().then((results)=> {
        console.log(results)
    }).catch((error)=> {
        console.log(error)
    })

    db.collection('Girls').find().count().then((result)=> {
        console.log(result)
    }).catch((error)=> {
        console.log(error)
    })

    client.close();
});
