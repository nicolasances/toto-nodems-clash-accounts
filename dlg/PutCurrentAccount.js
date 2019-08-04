var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/AccountConverter');

var MongoClient = mongo.MongoClient;

/**
 * Sets the specified account as the current account for the user
 * Requires:
 *  - req.query.user            : the user email
 *  - req.body.accountId        : the id of the account
 */
exports.do = (req) => {

    return new Promise((success, failure) => {

        let email = req.body.user;

        // VAlidation 
        if (!email) { failure({ code: 400, message: '"user" is a mandatory field' }); return; }
        if (!req.body.accountId) { failure({ code: 400, message: '"accountId" is a mandatory field' }); return; }

        return MongoClient.connect(config.mongoUrl, function (err, db) {

            // Set the current state to TRUE
            db.db(config.dbName).collection(config.collections.accounts).updateOne({ _id: new mongo.ObjectId(req.body.accountId) }, converter.setAccountCurrent(true), function (err, res) {

                // Set all other accounts to NOT CURRENT
                db.db(config.dbName).collection(config.collections.accounts).updateOne({ _id: {$ne: new mongo.ObjectId(req.body.accountId)} }, converter.setAccountCurrent(false), function (err, res) {

                    db.close();

                    success(res);
                });

            });
        });
    });


}