const  { 
    ReasonPhrases, 
    StatusCodes, 
    getReasonPhrase, 
    getStatusCode, 
}         = require('http-status-codes');
const jwt = require("jsonwebtoken");

// Custom Message
const { AUTH } = require('../message.json');

// Config File
const config = process.env;
/** 
 * This middleware is use for allowing only authenticated user to access the api
*/

const verifyToken = (req, res, next) => {
  
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(StatusCodes.FORBIDDEN).json({ message:AUTH.TOCKEN_REQUIRED });
    }
    
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message:AUTH.INVALID_TOCKEN });
    }
    
    return next();
};

module.exports = verifyToken;