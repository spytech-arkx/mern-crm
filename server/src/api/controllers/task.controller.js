const Task = require('../models/task.model');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

// GET all tasks

const allTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createAt: -1 });
    if (tasks.length === 0) throw new Error(`No task available`);

    res.status(200).json(tasks);
  } catch (err) {
    if (err.message === 'No task available') {
      res.status(404).json({ message: 'No task available' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// GET task by ID

const getTask = async (req, res) => {
  const { id } = req.params;

  //add verification ID

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no such task' });
  }

  try {
    const task = await Task.findById(id);
    if (task == null) {
      return res.status(404).json({ message: 'no such task' });
    }
    res.status(200).json(task);
  } catch (err) {
    if (err.message === 'no such task') {
      res.status(404).json({ message: 'no such task' });
    }
    res.status(500).json({ message: `Internal server error` });
  }
};

// Create new task POST

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: `Internal server error` });
  }
};

// Update a task by ID

const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  //add verification ID

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no such task' });
  }
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: `Internal server error` });
  }
};

// Delete a task

const deleteTask = async (req, res) => {
  const { id } = req.params;

  //add verification ID

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no such task' });
  }

  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: `Internal server error` });
  }
};

module.exports = {
  allTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
