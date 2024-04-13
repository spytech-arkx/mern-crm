const nodemailer = require('nodemailer');
// Create a Nodemailer transporter with configuration options
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // we use no secure port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// Verify if the transporter is ready to send emails
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('ready for msgs');
    console.log(success);
  }
});
// Function to send a verification email with a verification link
const sendVerificationEmail = async (email, verificationLink) => {
  const mailOptions = {
    from: 'no-reply@snz.ark',
    to: email,
    subject: 'email verification',
    html: `<p>click on the link to confirm your registration</p><a href="${verificationLink}">HERE</a>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Mail sent successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to send Mail' };
  }
};
// Function to send a customizable email
const sendEmail = async (sender, to, subject, text, html) => {
  try {
    const mailOptions = {
      from: sender,
      to,
      subject,
      text,
      html,
    };
    const info = await transporter.sendMail(mailOptions);

    if (info.accepted) {
      return {
        message: 'email sent successfully',
        accepted: info.accepted,
        rejected: info.rejected,
        pending: info.pending,
      };
    }
    if (info.pending) {
      return {
        message: 'sending email ...',
        pending: info.pending,
        rejected: info.rejected,
      };
    }
    return { message: 'failed to send email' };
  } catch (error) {
    throw new Error('Failed to send Mail:', error);
  }
};

module.exports = { sendVerificationEmail, sendEmail };
