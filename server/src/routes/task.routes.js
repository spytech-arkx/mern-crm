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

const taskRouter = express.Router();

taskRouter.get('/', allTasks);
taskRouter.get('/:id', validateTaskId, getTask);
taskRouter.post('/', [validateTaskName(), validateTaskDescription()], createTask);
taskRouter.put(
  '/:id',
  validateTaskId,
  [validateTaskName(), validateTaskDescription()],
  updateTask,
);
taskRouter.delete('/:id', validateTaskId, deleteTask);

module.exports = taskRouter;
