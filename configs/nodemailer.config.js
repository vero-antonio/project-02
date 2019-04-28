const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thisisnearby@gmail.com',
    pass: process.env.MAIL_PASSWORD
  }
});

module.exports = transporter;