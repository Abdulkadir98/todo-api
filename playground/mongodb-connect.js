const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if(err){
        return console.log('Unable to connect to mongo db server.');
    }
    console.log('Connected to mongo db server.');

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to create collection', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));

    // });
    db.collection('Users').insertOne({
        name: 'Abdul Kadir',
        age: 19,
        location:'Chennai, Tamil Nadu, India'
    }, (err, result) => {
        if(err){
            return console.log('Unable to create collection', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));

    });

    db.close();

});