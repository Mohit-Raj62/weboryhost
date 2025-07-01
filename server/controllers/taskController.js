const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create task", details: error.message });
  }
};

exports.listTasks = async (req, res) => {
  try {
    const { assignee, status } = req.query;
    let query = {};
    if (assignee) query.assignee = assignee;
    if (status) query.status = status;
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch tasks", details: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch task", details: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update task", details: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete task", details: error.message });
  }
};

exports.notifyTask = async (req, res) => {
  try {
    // Mock notification logic
    res.json({ message: `Notification sent for task ${req.params.id}` });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send notification", details: error.message });
  }
};
