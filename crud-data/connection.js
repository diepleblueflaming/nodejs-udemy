const {MongoClient, ObjectId} = require('mongodb');
const Connection = MongoClient.connect('mongodb://localhost:27017');

module.exports = {
    myDB: new Promise(function (resolve, reject) {
        Connection.then(function (database) {
            const myDB = database.db('mongodb-basic');
            resolve(myDB);
        }).catch((err) => {
            console.log('Unable connect to mongodb !!!!!!!');
            reject(err);
        })
    }),
    ObjectId
};
