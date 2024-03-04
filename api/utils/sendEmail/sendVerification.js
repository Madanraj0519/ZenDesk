const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();

function sendEmail(user){
    nodemailer.createTestAccount((err, account) => {
        var transporter = nodemailer.createTransport(smtpTransport({
           service:"gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,       // Sender mail id
                pass: process.env.EMAIL_PASSWORD,                 // Sender password
            }
            }));
        let mailOptions = {
            from: `ZenDesk-Clone Verification Mail 📧" <${process.env.EMAIL_USERNAME}>`,        // Sender mail id
            to: user.userEmail,                // Reciever mail id (For multiple recievers to:'abc@gmail.com,xyz@gmail.com')
            subject : "Verify your email...",
            html : `
                 <p>Hello 🙋‍♂️ ${user.userName}, verify your email by clicking this link...</p>
                 <a href='https://zendesk-clone.onrender.com/verify-email?emailToken=${user.emailToken}'>Verify Your Email</a>
                `, 
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error', error);
            }
            else{
                console.log('Success', info);
            }
        });
    });
  }

module.exports = {sendEmail};