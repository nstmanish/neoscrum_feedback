// inlude mongoose package
const mongoose = require('mongoose');

// Create Schema
const feedSchema = new mongoose.Schema({
    feedby    : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    feedto    : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment   : { type: String, required: true }
},
{
    timestamps: true
});

// export module
module.exports = mongoose.model("Feed", feedSchema);