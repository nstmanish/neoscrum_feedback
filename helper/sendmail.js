const {transporter}    = require('../configs/mailer');
const { mail }          = require('../message.json');
const  { 
    ReasonPhrases, 
    StatusCodes, 
    getReasonPhrase, 
    getStatusCode, 
} =  require('http-status-codes');

exports.sendPassword = async (user, password) => {

    const mailOptions = {
        from: process.env.MAILID,
        to: user.email,
        subject: mail.LOGIN_PASSWORD,
        html: `your login password is ${password}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            throw new Error(error)
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}