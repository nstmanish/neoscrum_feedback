const Joi = require('joi');

const FeedSchema = Joi.object({
    comment: Joi.string().min(1).required(),
}).unknown();

module.exports = FeedSchema;