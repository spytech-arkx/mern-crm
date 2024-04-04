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

// Route pour la gestion des tâches
const router = express.Router();

// Endpoint GET all tasks

router.get('/', allTasks);

// Endpoint GET a task by ID

router.get('/:id', validateTaskId, getTask);

// Endpoint POST a task

router.post('/', [validateTaskName(), validateTaskDescription()], createTask);

// Endpoint UPDATE a task by ID

router.put(
  '/:id',
  validateTaskId,
  [validateTaskName(), validateTaskDescription()],
  updateTask,
);

// Endpoint DELETE task

router.delete('/:id', validateTaskId, deleteTask);

module.exports = router;
