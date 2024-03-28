const Task = require("../models/task.model");
const mongoose = require("mongoose");

// GET all tasks

const allTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET task by ID

const getTask = async (req, res) => {
  const { id } = req.params;

  //add verification ID

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such task" });
  }

  try {
    const task = await Task.findById(id);
    if (task == null) {
      return res.status(404).json({ message: "Tâche introuvable" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new task POST

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a task by ID

const updateTask = async (req, res) => {
  const { id } = req.params;

  //add verification ID

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such task" });
  }
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task

const deleteTask = async (req, res) => {
  const { id } = req.params;

  //add verification ID

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such task" });
  }

  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Tâche supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  allTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
