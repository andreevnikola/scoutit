require('dotenv').config();

// const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail')

// const transporter = nodemailer.createTransport({
//   auth: {
//     user: 'trustly@mail.bg',
//     pass: 'NikolaAndreev_2008'
//   }
// });

function mail(reciever: string, subject: string, html: string){
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: reciever, // Change to your recipient
    from: 'scoutit@mail.bg', // Change to your verified sender
    subject: subject,
    html: html,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error: any) => {
      console.error(error)
    })
    // let mailOptions = {
    //     from: 'quksolk@outlook.com',
    //     to: reciever,
    //     subject: subject,
    //     html: html
    //   };
      
    //   transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });
}

mail("nikicha47196@abv.bg", "Test", "<h1>BLACK NIGGA</h1>");

module.exports = { mail };