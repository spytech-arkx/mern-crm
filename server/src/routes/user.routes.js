const express = require('express');
const { validateParamsId, validateBodyData } = require('../middlewares/validator');
const sanitizeBodyData = require('../middlewares/sanitizer');
const {avoidAuth}= require("../middlewares/avoid.auth");
const {isAuth}= require("../middlewares/is.auth");

const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUsers,
  loginUser,
  logout,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/', sanitizeBodyData, validateBodyData, createUsers);
userRouter.post('/auth/login', avoidAuth, loginUser);
userRouter.post('/auth/logout', isAuth, logout);
userRouter.get('/', getUsers);
userRouter.get('/:id', validateParamsId, getUserById);
userRouter.patch(
  '/:id',
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateUser,
);
userRouter.post('/auth/login', avoidAuth, loginUser)
userRouter.delete('/:id', validateParamsId, deleteUser);

module.exports = userRouter;
