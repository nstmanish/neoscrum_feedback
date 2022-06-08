// Import Config File
const {transporter}    = require('../config/mailer');

// Import Custom Message
const { mail }          = require('../message.json');
const  { 
    ReasonPhrases, 
    StatusCodes, 
    getReasonPhrase, 
    getStatusCode, 
} =  require('http-status-codes');

// Send Mail using nodemailer Package
exports.sendPassword = async (user, password) => {

    //  body of mail
    const mailOptions = {
        from: process.env.MAILID,
        to: user.email,
        subject: mail.LOGIN_PASSWORD,
        html: `your login password is ${password}`
    };

    // Function to send mail
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            throw new Error(error)
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}