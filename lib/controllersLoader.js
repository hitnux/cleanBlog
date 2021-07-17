const fs = require('fs');

// Getting an Array of the files in the 'controllers' folder.
let files = fs.readdirSync( __dirname + '/../controllers');

module.exports = app => {
    files.forEach( fileName => {
        require( __dirname + '/../controllers/' + fileName )(app);
    });
}