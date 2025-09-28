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

const Brevo = require('@getbrevo/brevo');

// Brevo
const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);
const sendForgetPasswordMail = (firstName, email, token) => {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = 'Password reset - StudyBuddy';
    sendSmtpEmail.htmlContent = `
        <h3>Hello ${firstName}</h3>
        <p>Please <a href='${process.env.CLIENT_URL}/auth/forget-password?token=${token}'>Click here</a> to reset your account password</p>
        <p>This link is valid only of 5 minutes.</p>
        <br />
        <br />
        <br />
        <p>Thank You</p>
        <p>Md Habibul Hasan</p>
        <p>programmerhasan0@gmail.com</p>`;

    sendSmtpEmail.sender = {
        name: 'Study Buddy',
        email: 'programmerhasan0@gmail.com',
    };
    sendSmtpEmail.to = [{email: email}];
    return apiInstance.sendTransacEmail(sendSmtpEmail);
};

module.exports.sendForgetPasswordMail = sendForgetPasswordMail;
