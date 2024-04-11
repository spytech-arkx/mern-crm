const nodemailer = require('nodemailer');

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

module.exports = { sendVerificationEmail };
