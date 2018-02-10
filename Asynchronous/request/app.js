const yargs = require('yargs');
const user = require('./user');

// get user input
const argv = yargs.
    options({
        address : {
            describe : 'address for get weather',
            demand : true,
            alias: 'a'
        }
    }).
    help().
    argv;
const encodeAddress = encodeURIComponent(argv['address']);
user.get(encodeAddress, function (error, response) {
    if(error){
        console.log(error);
    }else {
        // pretty print object
        console.log(JSON.stringify(response, undefined, 2));
    }
});

