const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Function to handle validations errors

const handleValidationError = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

// function for validate Id using mongoose

const validateTaskId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'invalid ID' });
  }
  next();
};

// Function for validae and sanitize Task name field
const validateTaskName = () => {
  return body('name').trim().escape().notEmpty().withMessage('Task name required');
  //add more validations
};

// Function for validae and sanitize Task description field
const validateTaskDescription = () => {
  return body('description')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Description required');

  //add more validations
};

// Function for validae and sanitize Task dueDate field

const validateTaskDueDate = () => {
  return body('dueDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage('Date format not valid')
    .toDate();
};

// Function for validae and sanitize Task priority field

const validateTaskPriority = () => {
  return body('priority')
    .optional({ nullable: true, checkFalsy: true })
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Choose a priority level');
};

// Function for validae and sanitize Task assignedTo field
const validateTaskAssignedTo = () => {
  return body('assignedTo')
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage('Invalid Id');
};

// Function for validae and sanitize Task status field
const validateTaskStatus = () => {
  return body('status')
    .optional({ nullable: true, checkFalsy: true })
    .isIn(['Todo', 'In Progress', 'Done'])
    .withMessage('Choose a status');
};

module.exports = {
  validateTaskName,
  validateTaskDescription,
  validateTaskDueDate,
  validateTaskPriority,
  validateTaskAssignedTo,
  validateTaskStatus,
  handleValidationError,
  validateTaskId,
};
