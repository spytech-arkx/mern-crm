const express = require('express');
const { validateParamsId, validateBodyData } = require('../middlewares/validator');
const { isAuth } = require('../middlewares/authenticator');
const sanitizeBodyData = require('../middlewares/sanitizer');
const {
  getTasks,
  getTaskById,
  deleteTask,
  updateTask,
  createTasks,
} = require('../controllers/task.controller');

const taskRouter = express.Router();
taskRouter.use(isAuth);
taskRouter.post('/', sanitizeBodyData, validateBodyData, createTasks);
taskRouter.get('/', getTasks);
taskRouter.get('/:id', validateParamsId, getTaskById);
taskRouter.patch(
  '/:id',
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateTask,
);
taskRouter.delete('/:id', validateParamsId, deleteTask);

module.exports = taskRouter;
