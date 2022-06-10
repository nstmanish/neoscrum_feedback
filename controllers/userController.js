// Npm Package
const bcrypt = require('bcryptjs');
const jwt    = require("jsonwebtoken");

// Helper
const Password = require("../helper/password");
const mailer   = require('../helper/sendmail');

const {USER}  = require('../message.json');
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
        const { name, email } = req.body;
        // Check The User
        let userExist = await User.findOne({ email }).select("-r");
        // Check user exist
        if ( userExist ) { return res.status(StatusCodes.NOT_FOUND).json({message:USER.USER_EXIST}) }
        // Generate Password
        const generatedPassword = Password.password;
        // Encrypt Password
        const encryptedPassword = await bcrypt.hash(generatedPassword, 10);
        // Add User
        let path = req.file.path.replace('uploads/', '');
        let user = await User.create({
            name,
            email,    
            profile : path || 'https://picsum.photos/200',  
            password : encryptedPassword, 
            token: null,   
        });
        // Send Mail
        await mailer.sendPassword(user, generatedPassword);
        // Send Response
        res.status(StatusCodes.OK).json({message:USER.USER_CREATED});
    }catch(err){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).send(err);
    }
}

// Login
exports.login = async ( req, res ) => {
    try {
        let { email, password } = req.body;
        // Get The user
        let user = await User.findOne({ email }).select({ "r":0, 'createdAt':0 , 'updatedAt':0 });
        // Check user exist
        if (!user) { return res.status(StatusCodes.FORBIDDEN).json({message:USER.USER_NOT_FOUND}) }
        // Check the password
        if (!(await bcrypt.compare(password, user.password))) { return res.status(StatusCodes.FORBIDDEN).json({message:USER.WRONG_PASSWORD}) }
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
            user.password = '';
            return res.status(StatusCodes.OK).json(user);
        }
        return res.status(StatusCodes.BAD_REQUEST).json({user});
    }catch(err){ res.status(StatusCodes.BAD_REQUEST).send(err) }
}

// Default Admin
exports.createAdmin = async ( req, res ) => {
    // create default admin
    email = "admin@gmail.com";
    let user = await User.findOne({ email }).select("-r");
    // Check user exist
    if (user) { return res.status(StatusCodes.NOT_FOUND).json({message:USER.USER_EXIST}) }
    // Generate Password
    const generatedPassword = 'password';
    // Encrypt Password
    const encryptedPassword = await bcrypt.hash(generatedPassword, 10);
    // Add User
    user = await User.create({
        name:"admin",
        email:"admin@gmail.com",    
        profile :'https://picsum.photos/200',  
        password : encryptedPassword, 
        isAdmin: true,
        token: null,   
    });
    // Send Response
    res.status(StatusCodes.OK).json({ message:"Admin created", user });
}