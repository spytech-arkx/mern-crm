const User = require('../../models/user.model');
require('dotenv').config();

const { verify } = require('jsonwebtoken');
const { readUsers, updateWithoutReturn } = require('../db/user.service');

// Middleware function to verify the email address using a token
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) throw new Error('Token is missing');

    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await readUsers({_id: userId});

    if (!user) throw new Error('User not found');
    if (user.verified) throw new Error('User already verified');
    
    await updateWithoutReturn(userId, { verified: true });
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { verifyEmail };
