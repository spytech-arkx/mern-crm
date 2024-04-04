const express = require('express');
const {
  validateTaskName,
  validateTaskDescription,
  validateTaskId,
} = require('../models/express-validator/task.validators');
const {
  allTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');

const router = express.Router();
router.get('/', allTasks);
router.get('/:id', validateTaskId, getTask);
router.post('/', [validateTaskName(), validateTaskDescription()], createTask);
router.put(
  '/:id',
  validateTaskId,
  [validateTaskName(), validateTaskDescription()],
  updateTask,
);
router.delete('/:id', validateTaskId, deleteTask);


module.exports = router;
