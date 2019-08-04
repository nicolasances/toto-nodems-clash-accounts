var mongo = require('mongodb');
var config = require('../config');

var MongoClient = mongo.MongoClient;

/**
 * Deletes the specified account
 * Requires:
 *  - req.params.id            : the id of the account to delete
 */
exports.do = (req) => {

    return new Promise((success, failure) => {

        return MongoClient.connect(config.mongoUrl, function (err, db) {

            // Set the current state to TRUE
            db.db(config.dbName).collection(config.collections.accounts).deleteOne({ _id: new mongo.ObjectId(req.params.id) }, function (err, res) {

                db.close();

                success(res);

            });
        });
    });


}