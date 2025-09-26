/**
 *
 * Project Name : study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : sendMail.util.js
 * File description: This file is reponseble for sending mails
 * Date : 26/09/2025
 *
 */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'programmerhasanprojects@gmail.com',
        pass: process.env.GMAIL_SMTP_PW,
    },
});

const sendForgetPasswordMail = (firstName, email, token) => {
    return transporter.sendMail({
        from: 'programmerhasanprojects@gmail.com',
        to: email,
        subject: 'Password Reset - study-buddy',
        html: `
        <h3>Hello ${firstName}</h3>
        <p>Please <a href='${process.env.CLIENT_URL}/auth/forget-password?token=${token}'>Click here</a> to reset your account password</p>
        <p>This link is valid only of 5 minutes.</p>
        <br />
        <br />
        <br />
        <p>Thank You</p>
        <p>Md Habibul Hasan</p>
        <p>programmerhasan0@gmail.com</p>
        `,
    });
};

module.exports.sendForgetPasswordMail = sendForgetPasswordMail;
