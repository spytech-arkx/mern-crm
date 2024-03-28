const express = require("express");
const {
  allTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

// Route pour la gestion des tâches
const router = express.Router();
const Task = require("../models/task.model");

// Endpoint GET all tasks

router.get("/", allTasks);

// Endpoint GET a task by ID

router.get("/:id", getTask);

// Endpoint POST a task

router.post("/", createTask);

// Endpoint UPDATE a task by ID

router.put("/:id", updateTask);

// Endpoint DELETE task

router.delete("/:id", deleteTask);

module.exports = router;
