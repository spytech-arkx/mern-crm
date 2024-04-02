const express = require('express');
const { validateParamsId, validateBodyData } = require('../middlewares/validator');
const sanitizeBodyData = require('../middlewares/sanitizer');
const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUsers,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/', sanitizeBodyData, validateBodyData, createUsers);
userRouter.get('/', getUsers);
userRouter.get('/:id', validateParamsId, getUserById);
userRouter.patch(
  '/:id',
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateUser,
);
userRouter.delete('/:id', validateParamsId, deleteUser);

module.exports = userRouter;
