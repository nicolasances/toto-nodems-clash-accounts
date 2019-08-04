var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/AccountConverter');

var MongoClient = mongo.MongoClient;

/**
 * Posts a new account. Will save it as "not current"
 * Requires:
 *  - req.query.user               : the email of the user
 *  - tag                          : of the account
 *  - name                         : name of the account 
 */
exports.do = (req) => {

    return new Promise((success, failure) => {

        let email = req.query.user;

        // VAlidation 
        if (!email) { failure({ code: 400, message: '"user" is a required query param' }); return; }
        if (!req.body.tag) { failure({ code: 400, message: '"tag" is a mandatory field' }); return; }
        if (!req.body.name) { failure({ code: 400, message: '"name" is a mandatory field' }); return; }

        return MongoClient.connect(config.mongoUrl, function (err, db) {

            db.db(config.dbName).collection(config.collections.accounts).insertOne(converter.accountPO(email, req.body), function (err, res) {

                db.close();

                success({ id: res.insertedId });

            });
        });
    });

}