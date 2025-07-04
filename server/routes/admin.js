const express = require("express");
const router = express.Router();
const authController = require("../controllers/admin/authController");
const dashboardController = require("../controllers/admin/dashboardController");
const adminController = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");
const productController = require("../controllers/productController");
const careerController = require("../controllers/careerController");
const settingsController = require("../controllers/settingsController");

// Public routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Enhanced dashboard routes
router.get("/stats", adminAuth, dashboardController.getDashboardStats);
router.get("/activity", adminAuth, dashboardController.getRecentActivity);
router.get("/analytics", adminAuth, dashboardController.getAnalytics);
router.get("/health", adminAuth, dashboardController.getSystemHealth);

// Admin authentication routes
router.get("/dashboard", adminAuth, adminController.getDashboard);
router.get("/users", adminAuth, adminController.getUsers);
router.get("/posts", adminAuth, adminController.getPosts);
router.get("/comments", adminAuth, adminController.getComments);

// Role management routes
router.get("/roles", adminAuth, adminController.getRoles);
router.put("/roles/:role", adminAuth, adminController.updateRole);
router.post("/roles", adminAuth, adminController.createRole);
router.delete("/roles/:role", adminAuth, adminController.deleteRole);

// User management
router.put("/users/:id/status", adminAuth, adminController.updateUserStatus);
router.delete("/users/:id", adminAuth, adminController.deleteUser);
router.post("/users", adminAuth, adminController.createUser);
router.get("/users/:id", adminAuth, adminController.getUserById);
router.put("/users/:id", adminAuth, adminController.updateUser);

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

// Product management
router.get("/products", adminAuth, productController.getProducts);
router.post("/products", adminAuth, productController.createProduct);
router.get("/products/:id", adminAuth, productController.getProductById);
router.put("/products/:id", adminAuth, productController.updateProduct);
router.delete("/products/:id", adminAuth, productController.deleteProduct);

// Career management
router.get("/careers", adminAuth, careerController.getCareers);
router.post("/careers", adminAuth, careerController.createCareer);
router.get("/careers/:id", adminAuth, careerController.getCareerById);
router.put("/careers/:id", adminAuth, careerController.updateCareer);
router.delete("/careers/:id", adminAuth, careerController.deleteCareer);

// Settings management
router.get("/settings", adminAuth, settingsController.getSettings);
router.put("/settings", adminAuth, settingsController.updateSettings);

// Test admin authentication
router.get("/test-auth", adminAuth, (req, res) => {
  res.json({
    message: "Admin authentication successful!",
    admin: {
      id: req.admin._id,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
});

module.exports = router;
