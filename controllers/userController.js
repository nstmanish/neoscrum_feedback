// Npm Package
const bcrypt = require('bcryptjs');
const jwt    = require("jsonwebtoken");

// Helper
const Password = require("../helper/password");
const mailer   = require('../helper/sendmail');

const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
}           =  require('http-status-codes');

// include models
const User = require('../models/userModel');

/**
 * This function Register new Employee | Admin can only add Employee
 */
exports.register = async ( req, res ) => {
    try {
        const { name, email, profile } = req.body;
        // Validation
        const generatedPassword = Password.password;
        // Encrypt Password
        encryptedPassword = await bcrypt.hash(generatedPassword, 10);
        // Add User
        let user = await User.create({
            name,
            email,    
            // profile : req.file.path ,  
            password : encryptedPassword, 
            token: null,   
        });
        // Send Mail
        await mailer.sendPassword(user, generatedPassword);
        // Send Response
        res.status(StatusCodes.OK).json({user});
    }catch(err){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).send(err);
    }
}

// Login
exports.login = async ( req, res ) => {
    try {
        const { email, password } = req.body;
        // Get The user
        const user = await User.findOne({ email });
        // Check user exist
        if (!user) { return res.status(StatusCodes.NOT_FOUND).json(user) }
        // Check the password
        if (!(await bcrypt.compare(password, user.password))) { return res.status(StatusCodes.FORBIDDEN).json("dd") }
        // Send JWT
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await jwt.sign(
                { user_id: user._id, email, is_admin : user.isAdmin  },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "5h",
                }
            );
            user.token = token;
            return res.status(StatusCodes.OK).json(user);
        }
        return res.status(StatusCodes.BAD_REQUEST).json({user});
    }catch(err){ res.status(StatusCodes.BAD_REQUEST).send(err) }
}

// logout
exports.logout = async ( req, res ) => {
    try {
        res.status(StatusCodes.OK)
    }catch(err){  res.status(StatusCodes.BAD_REQUEST).send(err) }
}