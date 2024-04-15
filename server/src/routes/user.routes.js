const express = require('express');
const { verifyEmail } = require('../services/emails/emailVerification');
const { sendNotifEmail, postEmail } = require('../services/emails/email.controller');
const {
  registerUser,
  loginUser,
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
const { permission, authenticator } = require('../middlewares/authenticator');

const userRouter = express.Router(); // Create an Express router

// Endpoint GET all users
userRouter.get('/', authenticator, permission('admin'), getUsers);
userRouter.post('/notif', sendNotifEmail);
userRouter.post('/send/:id', validateUserId, postEmail);

// Endpoint GET a user by ID
userRouter.get('/:id', validateUserId, getUserById);

// Endpoint for registering a new user
userRouter.post(
  '/register',
  [validateUserName(), validateEmail(), validatePassword(), handleValidationError],
  registerUser,
);

// Endpoint for Email verification
userRouter.get('/verify-email/:token', verifyEmail);

// Endpoint for logging in an existing user
userRouter.post(
  '/login',
  [validateEmail(), validatePassword(), handleValidationError],
  loginUser,
);

// Endpoint for updating a user by ID
userRouter.put(
  '/:id',
  [
    validateUserId,
    validateUserName(),
    validateEmail(),
    validatePassword(),
    handleValidationError,
  ],
  patchUser,
);

// Endpoint DELETE user by ID
userRouter.delete('/:id', validateUserId, deleteUserById);

module.exports = userRouter;
