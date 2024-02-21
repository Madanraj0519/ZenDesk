const nodemailer = require('nodemailer');
const {createMailTransporter} = require('./createMailTransporter');

const sendVerificationMail = (user) => {
    nodemailer.createTestAccount((err, account) => {
        
    const transporter = createMailTransporter();

    const mailOptions = {
        from : "User Verification <madan__raj@outlook.com>",
        to : "madanswetha10@gmail.com",
        subject : "Verify your email...",
        html : `
        <p>Hello 🙋‍♂️ ${user.userName}, verify your email by clicking this link...</p>
        <a href='http://localhost:5173/verify-email?emailToken=${user.emailToken}'>Verify Your Email</a>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }else{
            console.log('Verification email sent successfully');
        }
    });
    })
};

module.exports = { sendVerificationMail };