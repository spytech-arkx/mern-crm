const express = require("express");
const { validateParamsId, validateBodyData } = require("../middlewares/validator");
const { isAuth } = require("../middlewares/authenticator");
const sanitizeBodyData = require("../middlewares/sanitizer");
const {
  getTasks,
  getTaskById,
  deleteTask,
  updateTask,
  createTasks,
} = require("../controllers/task.controller");

const taskRouter = express.Router();
taskRouter.post("/", isAuth, sanitizeBodyData, validateBodyData, createTasks);
taskRouter.get("/", isAuth, getTasks);
taskRouter.get("/:id", isAuth, validateParamsId, getTaskById);
taskRouter.patch(
  "/:id",
  isAuth,
  validateParamsId,
  sanitizeBodyData,
  validateBodyData,
  updateTask,
);
taskRouter.delete("/:id", isAuth, validateParamsId, deleteTask);

module.exports = taskRouter;
