const Joi = require('joi');

const FeedSchema = Joi.object({
    content: Joi.string().min(1).required(),
});

module.exports = FeedSchema;