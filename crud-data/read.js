const {myDB, ObjectId} = require('./connection');

(async () => {
    const db = await myDB;
    const collection = db.collection('aggregation');
    collection.find().
    toArray().
    then(function (res) {
        console.log(JSON.stringify(res, undefined, 2));
    }).
    catch(function (err) {
        console.log('error: ' + err);
    });

    collection.findOne({
        _id: new ObjectId("553f35a0eff0e6345e7c95e7")
    }).
    then((res) => {
        console.log(JSON.stringify(res, undefined, 2));
    }).
    catch((err) => {
        console.log('error: ' + err);
    });
})();
