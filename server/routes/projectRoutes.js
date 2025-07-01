const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// Project endpoints
router.post("/", projectController.createProject);
router.get("/", projectController.listProjects);
router.get("/:id", projectController.getProjectById);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

// Task endpoints
router.post("/:id/tasks", projectController.addTask);
router.put("/:id/tasks/:taskId", projectController.updateTask);
router.delete("/:id/tasks/:taskId", projectController.deleteTask);

// Collaboration endpoints
router.post("/:id/comments", projectController.addComment);
router.post("/:id/files", projectController.addFile);
router.post("/:id/activity-logs", projectController.addActivityLog);

module.exports = router; 