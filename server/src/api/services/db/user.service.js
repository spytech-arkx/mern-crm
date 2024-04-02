const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to create a JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

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
  const user = await User.create({ username, email, password: hash });
  return user; // Return the newly created user
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

module.exports = { signup, login, createToken };
