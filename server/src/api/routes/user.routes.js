// Import the required modules
const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller'); // Import controller functions
const router = express.Router(); // Create an Express router

// Define the endpoints:

// Endpoint for registering a new user
router.post('/api/auth/register', registerUser);

// Endpoint for logging in an existing user
router.post('/api/auth/login', loginUser);

// Export the router to be used in other parts of the application
module.exports = router;
