const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const handleValidationError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// function for validate Id using mongoose

const validateUserId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'invalid ID' });
  }
  next();
};
/*
// Function for validae and sanitize firstname
const validateFirstName = () => {
  return body('firstName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('First name required')
    .isLength({ min: 5, max: 10 })
    .withMessage('Field must be between 5 and 10 characters long');
  //add more validations
};

// Function for validae and sanitize last name field
const validateLastName = () => {
  return body('lastName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Last name required')
    .isLength({ min: 5, max: 10 })
    .withMessage('Field must be between 5 and 10 characters long');

  //add more validations
};
*/
const validateUserName = () => {
  return body('username').trim().escape().notEmpty().withMessage('Username required');
  //add more validations
};
// Function for validae and sanitize email
const validateEmail = () => {
  return body('email')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Email name required')
    .isEmail()
    .withMessage('invalid Email');
  //add more validations
};

// Function for validae and sanitize password field
const validatePassword = () => {
  return body('password')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('password required')
    .isLength({ min: 5, max: 10 })
    .withMessage('Field must be between 5 and 10 characters long');
};
/*
// Function for validae and sanitize role field
const validateRole = () => {
  return body('role')
    .optional({ nullable: true, checkFalsy: true })
    .isIn(['admin', 'manager', 'salesperson', 'support'])
    .withMessage('Choose a status');
};
*/
module.exports = {
  handleValidationError,
  validateUserId,
  // validateFirstName,
  // validateLastName,
  validateUserName,
  validatePassword,
  //validateRole,
  validateEmail,
};
