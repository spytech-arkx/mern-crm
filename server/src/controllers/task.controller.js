const handleError = require("../lib/errorHandler");
const { readTasks, writeTasks } = require("../services/db/task.service");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await readTasks({});
    res.status(200).json(tasks);
  } catch (err) {
    handleError(err, res);
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const tasks = await readTasks({ _id: req.params.id });
    if (!tasks.length) {
      return res
        .status(404)
        .json({ type: "ErrorNotFound", message: "Task not found :/" });
    }
    return res.status(200).json(tasks[0]);
  } catch (err) {
    return handleError(err, res);
  }
};

exports.createTasks = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      createdBy: req.user._id,
    };
    const writeData = await writeTasks(taskData, "insertOne");
    res
      .status(201)
      .json({ type: "write_insert", result: writeData, message: "Created." });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      modifiedBy: req.user._id,
    };
    const writeData = await writeTasks(taskData, "updateOne", { _id: req.params.id });
    if (!writeData.modifiedCount) {
      return res
        .status(404)
        .json({ type: "ErrorNotFound", message: "Task not found :/" });
    }
    return res
      .status(200)
      .json({ type: "write_update", result: writeData, message: "Updated." });
  } catch (err) {
    return handleError(err, res);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const writeData = await writeTasks({}, "deleteOne", { _id: req.params.id });
    if (!writeData.deletedCount) {
      return res
        .status(404)
        .json({ type: "ErrorNotFound", message: "Task not found :/" });
    }
    return res
      .status(200)
      .json({ type: "write_delete", result: writeData, message: "Deleted." });
    // 204 : No Content actually returns no content..
  } catch (err) {
    return handleError(err, res);
  }
};

exports.getTaskByTitle = async (req, res) => {
  try {
    const tasks = await readTasks({ title: req.query.title });
    if (!tasks.length) {
      return res
        .status(404)
        .json({ type: "ErrorNotFound", message: "Task not found :/" });
    }
    return res.status(200).json(tasks[0]);
  } catch (err) {
    return handleError(err, res);
  }
};
