const nodemailer = require("nodemailer");
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testsr10@gmail.com',
        pass: process.env.PASSWORD
    }
});
const sendMail = (subject, body, to) => {
    const mailOptions = {
        from: 'testsr10@gmail.com',
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