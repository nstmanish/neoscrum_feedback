// Import Package
const cron = require('node-cron');
const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
}           =  require('http-status-codes');

// Custom Message
const { FEED, CRON } = require('../message.json');

// Import Model
const User = require('../models/userModel');
const Feed = require('../models/feedModel');

// List All The User
exports.dashboard = async ( req, res ) => {
    try {
        let user  = await User.findOne({ _id : req.user.user_id });
        let feeds = await Feed.find({"feedto": req.user.user_id }, 'comment createdAt');
        res.status(StatusCodes.OK).json({data:{ feeds, user }});
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send(err);
    }
}

// Get The Feeds
exports.getFeed = async ( req, res ) => {
    try {
        let user = await User.findRandom().limit(3);
        res.status(StatusCodes.OK).json({data:user});
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

// Cron to notify on 1st of every month
exports.notifyCron = (req, res) => {
    try {
        cron.schedule('* * 1 * *', () => {
            console.log('running a task every minute');
        });
        res.status(StatusCodes.OK).json({message:CRON.CRON_RUN});
    } catch (err)
    {
        res.status(StatusCodes.BAD_REQUEST).send(err);
    }
}