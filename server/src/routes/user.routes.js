const express = require('express');
const { validateParamsId, validateBodyData } = require('../middlewares/validator');
const { isAuth } = require('../middlewares/authenticator');
const sanitizeBodyData = require('../middlewares/sanitizer');

const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUsers,
  register,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/register', sanitizeBodyData, validateBodyData, register);
userRouter.use(isAuth);
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
