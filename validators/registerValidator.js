const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().lowercase().required(),
});

module.exports = registerSchema;