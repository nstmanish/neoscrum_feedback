const  { 
    ReasonPhrases, 
    StatusCodes, 
    getReasonPhrase, 
    getStatusCode, 
} =  require('http-status-codes');

exports.validate = async (req, res, next) => {
    if(!req.user.is_admin){
        res.status(StatusCodes.BAD_REQUEST).send("admin only");
    };
    next();
}