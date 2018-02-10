const request = require('request');
module.exports = {
    get: function (id, callback) {
        // make request to server
        request.get({
                url: `http://127.0.0.1:3000/users/${id}`,
                json: true
            },
            (error, response, body) => {
                if (error) {
                    callback('Unable connect to server');
                }else {
                    callback(undefined, body);
                }
            });
    }
};
