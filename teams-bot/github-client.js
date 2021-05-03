var querystring = require('querystring');
var https = require('https');

function loadData(path,callback){
    console.log('this is a function');
    const options = {
        host : 'api.github.com',
        port : 443,
        path: path,
        method: 'GET',
        headers: {
            'User-Agent' : 'gitbot'
        }
    };
    const request = https.request(options,(response) => {
        var data = '';
        response.on('data',(chunk) => (data += chunk));
        response.on('end',() => {
            callback(JSON.parse(data));
        });
    });
    request.end();
}

function executeSearch(query,callback){
    loadData('/search/users?q=' + querystring.escape(query),callback);
}

function loadProfile(username,callback){
    loadData('/users/' + querystring.escape(username),callback)
}

module.exports = {
    executeSearch,
    loadProfile
};