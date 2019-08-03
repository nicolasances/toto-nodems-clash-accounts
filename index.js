var Controller = require('toto-api-controller');

var getAccounts = require('./dlg/GetAccounts');
var postAccount = require('./dlg/PostAccount');
var putCurrentAccount = require('./dlg/PutCurrentAccount');
var getCurrentAccount = require('./dlg/GetCurrentAccount');

var apiName = 'clash-accounts';

var api = new Controller(apiName);

api.path('GET', '/accounts', getAccounts);
api.path('POST', '/accounts', postAccount);
api.path('PUT', '/accounts/current', putCurrentAccount);
api.path('GET', '/accounts/current', getCurrentAccount);

api.listen();