const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport(smtpTransport({
        service : 'hotmail',
        auth : {
            user : 'madanswetha10@gmail.com',
            pass : 'wtjdnkyliqzxxhgr',
        },
    }));

    return transporter;
};

module.exports = {
    createMailTransporter
}