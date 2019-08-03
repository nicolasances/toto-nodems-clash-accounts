var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/AccountConverter');

var MongoClient = mongo.MongoClient;

/**
 * Gets the current account 
 * Requires: 
 *  - req.headers['userEmail']  : the user email 
 */
exports.do = (req) => {

    return new Promise((success, failure) => {

        let email = req.headers['userEmail'];

        // Validation
        if (!email) { failure({ code: 400, message: 'Please provide a userEmail HTTP header' }); return; }

        return MongoClient.connect(config.mongoUrl, function (err, db) {

            db.db(config.dbName).collection(config.collections.accounts).find({ user: email, current: true }).toArray(function (err, array) {

                db.close();

                if (array == null) {
                    success({ });
                    return;
                }

                success(converter.accountTO(array[0]));

            });
        });

    })
}