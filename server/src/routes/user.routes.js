// Import the required modules
const express = require('express');
const {
  getUsers,
  getUserById,
  patchUser,
  deleteUserById,
} = require('../controllers/user.controller');
const {
  validateUserId,
  validateUserName,
  validatePassword,
  validateEmail,
  handleValidationError,
} = require('../models/express-validator/user.validators');
const { registerUser, loginUser } = require('../middlewares/authenticator'); // Import controller functions
const router = express.Router(); // Create an Express router

// Define the endpoints:

// Endpoint GET all users
router.get('/', getUsers);

// Endpoint GET a user by ID
router.get('/:id', validateUserId, getUserById);

// Endpoint for registering a new user
router.post(
  '/register',
  [validateUserName(), validateEmail(), validatePassword()],
  registerUser,
);

// Endpoint for logging in an existing user
router.post('/login', [validateEmail(), validatePassword()], loginUser);

// Endpoint for updating a user by ID
router.put(
  '/:id',
  [
    validateUserName(),
    validateUserId,
    validateEmail(),
    validatePassword(),
    handleValidationError,
  ],
  patchUser,
);

// Endpoint DELETE user by ID
router.delete('/:id', validateUserId, deleteUserById);

module.exports = router;
