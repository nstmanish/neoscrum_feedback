// inlude mongoose package
const mongoose = require('mongoose');
const random   = require('mongoose-random');
// Create Schema
const userSchema = new mongoose.Schema({
    name      : { type: String, default: null, required: true },
    email     : { type: String, unique: true, required: true },
    profile   : { type: String, default: "https://picsum.photos/200" },
    password  : { type: String, required: true },
    isAdmin   : { type: Boolean, default: false },
    token     : { type: String, default: null },
},
{
    timestamps: true
});

userSchema.plugin(random, { path: 'r' });
// export module
module.exports = mongoose.model("User", userSchema);