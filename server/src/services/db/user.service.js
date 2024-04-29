const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const { sendVerificationEmail } = require('../emails/email.service');

// Function to create a JWT token
const createToken = (_id, role) =>
  jwt.sign({ _id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Function to sign up a new user
const signup = async (username, email, password) => {
  // Check if all fields are filled
  if (!username || !email || !password) {
    throw new Error('All fields must be filled');
  }
  // Check if the email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Hash the password
  const hash = await bcrypt.hash(password, 10);
  // Create a new user with hashed password
  const user = await User.create({
    username,
    email,
    password: hash,
    verified: false,
    role: 'Owner', // on peut mettre une logique pour que si l'email qu'il enregistre === process.env.OWNER_MAIL on lui donne le role "Owner"
  });
  // create token for email verification
  const verificationToken = createToken(user._id, user.role);
  // link to send to user for verify email
  const verificationLink = `http://localhost:3000/api/users/verify-email/${verificationToken}`;
  // send verification email after registration
  const result = await sendVerificationEmail(email, verificationLink);

  if (result.success) {
    return { user, verificationToken, message: result.message };
  }
  return { error: result.message };
};
// Function to log in an existing user
const login = async (email, password) => {
  // Check if all fields are filled
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Incorrect Email');
  }

  // Compare the provided password with the hashed password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Incorrect password');
  }

  return user; // Return the user if login is successful
};

// GET all users

const allUsers = async () => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    if (users.length === 0) throw new Error('No user available');

    return users;
  } catch (err) {
    if (err.message === 'No user available') {
      throw new Error('No user available');
    } else {
      throw new Error('internal server error');
    }
  }
};

// GET user by ID

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('No such user');
    }
    return user;
  } catch (err) {
    throw new Error('Internal server error');
  }
};

// Update a user by ID

const updateUser = async (userId, newData) => {
  try {
    const userUp = await User.findByIdAndUpdate(userId, newData, {
      new: true,
    });
    if (!userUp) {
      throw new Error('No such user');
    }
    return userUp;
  } catch (err) {
    throw new Error('Internal server error');
  }
};

// Delete a user by id

const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error('No such user');
    }
    return deletedUser;
  } catch (err) {
    throw new Error('Internal server error');
  }
};

module.exports = {
  signup,
  login,
  createToken,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
};
