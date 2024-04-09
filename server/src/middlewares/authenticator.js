const { login, signup, createToken } = require('../services/db/user.service');
const { verifyToken } = requre('../helpers/jwt');

// Controller function to register a new user
const registerUser = async (req, res) => {
  // Extract username, email, and password from the request body
  const { username, email, password } = req.body;

  try {
    // Call the signup function to create a new user
    const user = await signup(username, email, password);
    // Generate a JWT token for the newly registered user
    const token = createToken(user._id);
    // Send a successful response with the user details and token
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to log in an existing use
const loginUser = async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Call the login function to authenticate the user
    const user = await login(email, password);
    // Generate a JWT token for the authenticated user
    const token = createToken(user._id);
    // Send a successful response with the user details and toke
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.avoidAuth = (req, res, next) => {
  try {
    const token = req.cookies.tokenAuth || null;
    if (!token) {
      return next();
    }
    const verify = verifyToken(token);
    if (!verify) {
      return next();
    }
    return res.status(200).json({ message: 'you are already logged' });
  } catch (err) {
    throw err;
  }
};

module.exports = { registerUser, loginUser };
