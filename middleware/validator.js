const  { 
    ReasonPhrases, 
    StatusCodes, 
    getReasonPhrase, 
    getStatusCode, 
}           = require('http-status-codes');
const Joi   = require('joi')

const Validators = require('../validators');


module.exports = validator => {

    if(!Validators.hasOwnProperty(validator)){
        throw new Error(`'${validator}' validator is not exist`)
    }

    return async (req, res, next) => {
        console.log('sss======>',req);
        try {
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        }catch(err){
            if(err.isJoi) 
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({message: err.message});
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:ReasonPhrases.INTERNAL_SERVER_ERROR})
        }
    }
        
}