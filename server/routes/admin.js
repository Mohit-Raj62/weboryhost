const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

// Public routes
router.post("/signup", adminController.signup);
router.post("/login", adminController.login);

// Protected routes
router.get("/stats", adminAuth, adminController.getDashboardStats);
router.get("/activity", adminAuth, adminController.getRecentActivity);

// Admin authentication routes
router.get("/dashboard", adminAuth, adminController.getDashboard);
router.get("/users", adminAuth, adminController.getUsers);
router.get("/posts", adminAuth, adminController.getPosts);
router.get("/comments", adminAuth, adminController.getComments);

// User management
router.put("/users/:id/status", adminAuth, adminController.updateUserStatus);
router.delete("/users/:id", adminAuth, adminController.deleteUser);

// Post management
router.put("/posts/:id/status", adminAuth, adminController.updatePostStatus);
router.delete("/posts/:id", adminAuth, adminController.deletePost);

// Comment management
router.put(
  "/comments/:id/status",
  adminAuth,
  adminController.updateCommentStatus
);
router.delete("/comments/:id", adminAuth, adminController.deleteComment);

module.exports = router;
