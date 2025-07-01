const WebProject = require("../models/WebProject");
const { v4: uuidv4 } = require("uuid");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const project = new WebProject(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create project", details: error.message });
  }
};

// List/search projects
exports.listProjects = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: "i" } };
    }
    const projects = await WebProject.find(query);
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch projects", details: error.message });
  }
};

// Get project details
exports.getProjectById = async (req, res) => {
  try {
    const project = await WebProject.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch project", details: error.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await WebProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update project", details: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await WebProject.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete project", details: error.message });
  }
};

// Add task to project
exports.addTask = async (req, res) => {
  try {
    const project = await WebProject.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    const task = { ...req.body, id: uuidv4(), createdAt: new Date() };
    project.tasks.push(task);
    await project.save();
    res.status(201).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add task", details: error.message });
  }
};

// Update task in project
exports.updateTask = async (req, res) => {
  try {
    const project = await WebProject.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    const task =
      project.tasks.id(req.params.taskId) ||
      project.tasks.find((t) => t.id === req.params.taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });
    Object.assign(task, req.body);
    await project.save();
    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update task", details: error.message });
  }
};

// Delete task from project
exports.deleteTask = async (req, res) => {
  try {
    const project = await WebProject.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    const taskIndex = project.tasks.findIndex(
      (t) => t.id === req.params.taskId
    );
    if (taskIndex === -1)
      return res.status(404).json({ error: "Task not found" });
    project.tasks.splice(taskIndex, 1);
    await project.save();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete task", details: error.message });
  }
};

// Add comment to project
exports.addComment = async (req, res) => {
  try {
    const project = await WebProject.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    const comment = { id: uuidv4(), ...req.body, createdAt: new Date() };
    project.comments.push(comment);
    await project.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment", details: error.message });
  }
};

// Add file to project
exports.addFile = async (req, res) => {
  try {
    const project = await WebProject.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    const file = { id: uuidv4(), ...req.body, uploadedAt: new Date() };
    project.files.push(file);
    await project.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: "Failed to add file", details: error.message });
  }
};

// Add activity log to project
exports.addActivityLog = async (req, res) => {
  try {
    const project = await WebProject.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    const log = { id: uuidv4(), ...req.body, timestamp: new Date() };
    project.activityLogs.push(log);
    await project.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: "Failed to add activity log", details: error.message });
  }
};
