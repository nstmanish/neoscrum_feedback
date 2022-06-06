// include the lib
const mongoose = require('mongoose');

// include Message Json
const { database, user, admin } = require('../message.json');

// get the value from config
const { MONGO_URI } = process.env;

// connect with database 
exports.connect = () => {
    // calling connect function
    mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {
        // Success
        console.log(database.CONNECTED);
    })
    .catch(err => {
        // Error 
        console.log(database.ERROR_CONNECTING);
        console.log(err);
        process.exit(1);
    })
}

