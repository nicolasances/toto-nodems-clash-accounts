var httpRequest = require('request');
var keyStore = require('../util/KeyStore');
var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/AccountConverter');

var MongoClient = mongo.MongoClient;

/**
 * Enriches the account info with data coming from CoC APIs
 * Requires:
 *  - req.body.tag          : tag of the player
 *  - req.body.accountId    : account id
 */
exports.do = (req) => {

    return new Promise((success, failure) => {

        // Get the key
        keyStore.get(req.headers['x-correlation-id']).then((key) => {

            // Get the player tag
            let tag = req.body.tag.replace('#', '%23');

            // Prepare the call
            let httpReq = {
                url: 'https://api.clashofclans.com/v1/players/' + tag,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + key.key,
                    'Accept': 'application/json'
                }
            }

            // Call the CoC API
            httpRequest(httpReq, (err, resp, body) => {

                // In case of error fail
                if (err != null) { failure({ code: 500, message: err }); return; }

                let cocPlayer = JSON.parse(body);

                // Otherwise, update the account data
                return MongoClient.connect(config.mongoUrl, (err, db) => {

                    // Update 
                    db.db(config.dbName).collection(config.collections.accounts).updateOne({ _id: new mongo.ObjectId(req.body.accountId) }, converter.enrichAccount(cocPlayer), function (err, res) {

                        db.close();

                        success({});

                    });
                });

            });

        }, failure);

    })

}