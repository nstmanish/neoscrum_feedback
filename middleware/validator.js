const  { 
    ReasonPhrases, 
    StatusCodes, 
    getReasonPhrase, 
    getStatusCode, 
}           = require('http-status-codes');
const Joi   = require('joi')

const Validators = require('../validators');

// function for validation
module.exports =  validator => {
    // check the Validators has the property i.e : login, register and feed
    if(!Validators.hasOwnProperty(validator)){
        throw new Error(`'${validator}' validator is not exist`)
    }
    
    return async (req, res, next) => {
        try {
            // Validation of fields
            const validated = await Validators[validator].validateAsync(req.body)
            // add to the body
            req.body = validated
            // continue to next
            next()
        }catch(err){
            if(err.isJoi) 
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({message: err.message});
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:ReasonPhrases.INTERNAL_SERVER_ERROR})
        }
    }
}