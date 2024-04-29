const {
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  signup,
  createToken,
} = require('../services/db/user.service');

const getUsers = async (req, res) => {
  try {
    const users = await allUsers();
    res.status(200).json(users);
  } catch (err) {
    if (err.message === 'No user available') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUser(userId);
    res.status(200).json(user);
  } catch (err) {
    if (err.message === 'No such user') {
      res.status(404).json('No such user');
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const patchUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const newData = req.body;
    const user = await updateUser(userId, newData);
    res.status(200).json(user);
  } catch (err) {
    if (err.message === 'No such user') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await deleteUser(userId);
    res.status(200).json(user);
  } catch (err) {
    if (err.message === 'No such user') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Controller function to register a new user
const registerUser = async (req, res) => {
  // Extract username, email, and password from the request body
  const { username, email, password } = req.body;

  try {
    // Call the signup function to create a new user
    const user = await signup(username, email, password);
    // Generate a JWT token for the newly registered user

    // Send a successful response with the user details and token
    res.status(201).json({ user });
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
    const token = createToken(user._id, user.role);
    // Send a successful response with the user details and toke
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  patchUser,
  deleteUserById,
  registerUser,
  loginUser,
};
