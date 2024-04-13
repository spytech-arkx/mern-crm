const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

// Middleware function to verify the email address using a token
const verifyEmail = async (req, res, next) => {
  const token = req.params.token;

  try {
    if (!token) {
      throw new Error('Token is missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.verified) {
      throw new Error('User already verified');
    }
    // Update the user's verified status to true in the database
    await User.findByIdAndUpdate(userId, { verified: true });

    // Send a success response indicating that the email is verified
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    // Send an error response with a meaningful message
    res.status(400).json({ error: err.message });
  }
};

module.exports = { verifyEmail };
