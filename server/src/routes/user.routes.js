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
const userRouter = express.Router(); // Create an Express router

// Endpoint GET all users
userRouter.get('/', getUsers);

// Endpoint GET a user by ID
userRouter.get('/:id', validateUserId, getUserById);

// Endpoint for registering a new user
userRouter.post(
  '/register',
  [validateUserName(), validateEmail(), validatePassword()],
  registerUser,
);

// Endpoint for logging in an existing user
userRouter.post('/login', [validateEmail(), validatePassword()], loginUser);

// Endpoint for updating a user by ID
userRouter.put(
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
userRouter.delete('/:id', validateUserId, deleteUserById);

module.exports = userRouter;
