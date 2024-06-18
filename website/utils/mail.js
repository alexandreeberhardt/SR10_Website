const nodemailer = require("nodemailer");
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ADR,
        pass: process.env.MAIL_PASSWORD
    }
});
const sendMail = (subject, body, to) => {
    const mailOptions = {
        from: process.env.MAIL_ADR,
        to: to,
        subject: subject,
        text: body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}
module.exports = sendMail;