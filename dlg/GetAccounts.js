var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/AccountConverter');

var MongoClient = mongo.MongoClient;

/**
 * Returns the list of accounts
 * Requires: 
 *  - req.query.user     : the email of the user
 */
exports.do = (req) => {

    return new Promise((success, failure) => {

        let email = req.query.user;

        // Validation
        if (!email) { failure({ code: 400, message: '"user" is a required query param' }); return; }

        return MongoClient.connect(config.mongoUrl, function (err, db) {

            db.db(config.dbName).collection(config.collections.accounts).find({ user: email }).toArray(function (err, array) {

                db.close();

                if (array == null) {
                    success({ accounts: [] });
                    return;
                }

                var accounts = [];

                for (var i = 0; i < array.length; i++) {
                    accounts.push(converter.accountTO(array[i]));
                }

                success({ accounts: accounts });

            });
        });

    })

}