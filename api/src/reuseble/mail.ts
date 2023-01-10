const nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mail.scoutit@gmail.com',
    pass: process.env.MAIL_PASSWORD
  }
});


function mail(reciever: string, subject: string, html: string){
  var mailOptions = {
    from: 'mail.scoutit@gmail.com',
    to: reciever,
    subject: subject,
    html: html
  };
  transporter.sendMail(mailOptions, function(error: Error, info: any){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { mail };