const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
}           =  require('http-status-codes');

const { FEED } = require('../message.json');

// Import Model
const User = require('../models/userModel');
const Feed = require('../models/feedModel');

// List All The User
exports.index = async ( req, res ) => {
    try {
        let user = await User.find({});
        res.status(StatusCodes.OK).json({data:user});
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send(err);
    }
}

// Get The Feeds
exports.getFeed = async ( req, res ) => {
    try {
        let feed = await Feed.find({"feedto": req.user.user_id }, 'comment');
        res.status(StatusCodes.OK).json({data:feed});
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send(err);
    }
}

// Add Feeds
exports.createFeed = async ( req, res ) => {
    try {
        const user  = await User.findOne({ _id : req.body.userId });
        let feed    = await Feed.create({
            feedby    : req.user.user_id,
            feedto    : user._id,
            comment   : req.body.comment
        });
        res.status(StatusCodes.OK).json({message:FEED.FEED_SEND});
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send(err);
    }
}
