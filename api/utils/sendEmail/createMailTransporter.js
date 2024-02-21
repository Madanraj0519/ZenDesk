const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport(smtpTransport({
        service : 'hotmail',
        auth : {
            user : 'madan__raj@outlook.com',
            pass : 'Pichumani@01',
        },
    }));

    return transporter;
};

module.exports = {
    createMailTransporter
}