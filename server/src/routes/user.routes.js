const express = require('express');
const { validateParamsId, validateBodyData } = require('../middlewares/validator');
const sanitizeBodyData = require('../middlewares/sanitizer');
const {avoidAuth} = require("../middlewares/avoid.authentication")
const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUsers,
  loginUser,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/', sanitizeBodyData, validateBodyData, createUsers);
userRouter.post('/auth/login', avoidAuth, loginUser);
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
