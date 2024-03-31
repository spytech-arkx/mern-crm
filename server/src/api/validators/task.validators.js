const { body } = require('express-validator');

// Function for validae and sanitize Task name field
const validateTaskName = () => {
  return body('name').notEmpty().withMessage('Task name required').trim().escape();
  //add more validations
};

// Function for validae and sanitize Task description field
const validateTaskDescription = () => {
  return body('description')
    .notEmpty()
    .withMessage('Description required')
    .trim()
    .escape();
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
};
