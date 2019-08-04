var http = require('toto-request');

const NAME = 'clashAK';

var cachedKey = null;

/**
 * Retrieves the needed key
 */
exports.get = (correlationId) => {

    return new Promise((success, failure) => {

        // If the cached key is there 
        if (cachedKey) { success({ key: cachedKey }); return; }

        // Otherwise fetch it
        http({
            correlationId: correlationId,
            microservice: 'toto-nodems-lupin',
            method: 'GET',
            resource: '/boxes/' + NAME
        }).then((data) => {

            // If problems
            if (!data) { failure({ code: 500, message: 'No box found in LUPIN' }); return; }

            // Cache
            cachedKey = data.content;

            // Otherwise get the key 
            success({key: data.content});

        }, failure);

    })

}