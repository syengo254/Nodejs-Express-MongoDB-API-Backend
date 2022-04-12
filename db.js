const  { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/bookstore';
let dbConnection;

module.exports =  {
    connectToDb(cb) {
        MongoClient.connect(url)
            .then(client => {
                dbConnection = client.db();
                return cb();
            })
            .catch(e => {
                console.log(e);
                return cb(e);
            });
    },
    getDb() { return dbConnection; },
}