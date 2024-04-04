const Task = require('../models/task.model');
const { handleValidationError } = require('../models/express-validator/task.validators');

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

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'no such task' });
    }
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    if (err.message === 'no such task') {
      res.status(404).json({ message: 'no such task' });
    }

    res.status(500).json({ message: `Server Error` });
  }
};

// Create new task POST

const createTask = async (req, res) => {
  handleValidationError(req, res);

  try {
    const task = await Task.create(req.body);
    res.status(201).json({ message: 'Task created ', task });
  } catch (err) {
    handleValidationError(res, err);
  }
};

// Update a task by ID

const updateTask = async (req, res) => {
  //validation error part

  handleValidationError(req, res);

  const { id } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!task) {
      res.status(404).json({ messge: 'No such task' });
    }
    res.status(200).json({ message: 'Task Updated', task });
  } catch (err) {
    handleValidationError(res, err);
  }
};

// Delete a task by id

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not deleted' });
    }
    res.json({ message: 'Task deleted', deletedTask });
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
