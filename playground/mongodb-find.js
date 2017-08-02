const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if(err){
        return console.log('Unable to connect to mongo db server.');
    }
    console.log('Connected to mongo db server.');

    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to find docs', err);

    // });

    db.collection('Users').find({name: 'fag'}).count().then((count) => {
        console.log(`number of fags = ${count}`);
    }, (err) => {
        console.log('Some error', err);
    });

    // db.close();

});