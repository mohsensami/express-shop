const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'Shop';

let dbSet;

const mongodbConnect = (cb) => {
    MongoClient.connect(connectionURL, { useNewUrlParser: true })
        .then((client) => {
            console.log('Connected');
            dbSet = client.db(dbName);
            cb(client);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

const getDB = () => {
    if (dbSet) {
        return dbSet;
    }
    throw 'Database Not Found!';
};

exports.mongodbConnect = mongodbConnect;
exports.getDB = getDB;
