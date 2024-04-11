const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

//logic for email verification
const verifyEmail = async (req, res, next) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await User.findById(userId);

    if (!user || user.verified) {
      throw new Error('Invalid token or user already verified');
    }

    await User.findByIdAndUpdate(userId, { verified: true });

    res.status(200).send('Email verified successfully');
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = { verifyEmail };
