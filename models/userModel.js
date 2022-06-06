// inlude mongoose package
const mongoose = require('mongoose');

// Create Schema
const userSchema = new mongoose.Schema({
    name      : { type: String, default: null, required: true },
    email     : { type: String, unique: true, required: true },
    profile   : { type: String, default: null },
    password  : { type: String, required: true },
    token     : { type: String, default: null },
});

// export module
module.exports = mongoose.model("User", userSchema);