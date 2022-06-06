// Import Package
const nodemailer = require('nodemailer');

// Import Package > Config
require("dotenv").config();
const { MAILID, PASSWORD } = process.env;

// Export
exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAILID,
    pass: PASSWORD
  }
});