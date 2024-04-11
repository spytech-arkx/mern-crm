const nodemailer = require('nodemailer');
const User = require('../models/user.model');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // we use no secure port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('ready for msgs');
    console.log(success);
  }
});
const sendVerificationEmail = async (email, verificationLink) => {
  const mailOptions = {
    from: 'no-reply@snz.ark',
    to: email,
    subject: 'email verification',
    html: `<p>click on the link to confirm your registration</p><a href="${verificationLink}">HERE</a>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('mail sent succesfuly');
  } catch (error) {
    console.error('failed to send Mail');
  }
};

// send email to many users
const sendNotifEmail = async (
  subject = 'hello',
  message = 'hello from nodemailer',
  sender = 'no-reply@snz.ark',
) => {
  try {
    // Recherche des rôles
    const roles = await User.distinct('role');
    console.log('roles :', roles);

    // Choix du rôle à sélectionner
    const roleSelect = 'salesperson';

    // Recherche des utilisateurs avec le rôle sélectionné et récupération de leurs emails
    const users = await User.find({ role: roleSelect }, 'email');
    const emails = users.map((user) => user.email);
    console.log('users found :', users, emails);

    // Création des options de messagerie
    const mailOptions = {
      from: sender,
      to: emails,
      subject: subject,
      html: `<p> ${message} </p>`,
    };

    // Envoi du courriel
    await transporter.sendMail(mailOptions);
    console.log('Mail sent successfully');
  } catch (error) {
    console.error('Failed to send Mail:', error);
  }
};
module.exports = { sendVerificationEmail, sendNotifEmail };
