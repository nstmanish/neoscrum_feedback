const  { 
    ReasonPhrases, 
    StatusCodes, 
    getReasonPhrase, 
    getStatusCode, 
} =  require('http-status-codes');

const isAdmin = async (req, res, next) => {
    if(!req.user.is_admin){
        return res.status(StatusCodes.BAD_REQUEST).send("admin only");
    };
    return next();
}

module.exports = isAdmin;