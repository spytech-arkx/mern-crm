const { sendEmail } = require('./email.service');
const User = require('../../models/user.model');

// Function to send notification emails to multiple users based on their roles
const sendNotifEmail = async (req, res) => {
  const { role, sender, subject, text, html } = req.body;

  try {
    const roles = await User.distinct('role');
    console.log('roles :', roles);
    // Check if the specified role exists
    if (!roles.includes(role)) {
      return res.status(404).json({ message: `Role ${role} does not exist` });
    }
    // Find users with the specified role and retrieve their emails
    const users = await User.find({ role }, 'email');
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: `No user available on this role : ${role}` });
    }
    const emails = users.map((user) => user.email);

    const result = await sendEmail(sender, emails, subject, text, html);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'failed to send email' });
  }
};
// Function to send an email to a single user or multiple users
const postEmail = async (req, res) => {
  const { id } = req.params;
  const { to, subject, text, html } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userEmail = user.email;

    // Check if "to" is an array of email addresses or a single email address
    let recipients = Array.isArray(to) ? to : [to];

    // Send the email to each recipient

    const results = await Promise.all(
      recipients.map(async (recipient) => {
        return await sendEmail(userEmail, recipient, subject, text, html);
      }),
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'failed to send email' });
  }
};
module.exports = { sendNotifEmail, postEmail };
