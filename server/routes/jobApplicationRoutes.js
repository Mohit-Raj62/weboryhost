const express = require("express");
const router = express.Router();
const {
  getAllApplications,
  getApplicationStats,
  getApplicationsByJob,
  getApplication,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
  getRecentApplications,
} = require("../controllers/jobApplicationController");
const adminAuth = require("../middleware/adminAuth");

// Public routes (for job applications) - These should be first
router.post("/", createApplication);
router.get("/recent", getRecentApplications);

// Admin routes (protected) - These should be after public routes
router.get("/stats", adminAuth, getApplicationStats);
router.get("/job/:jobId", adminAuth, getApplicationsByJob);
router.get("/", adminAuth, getAllApplications);
router.get("/:id", adminAuth, getApplication);
router.put("/:id/status", adminAuth, updateApplicationStatus);
router.delete("/:id", adminAuth, deleteApplication);

module.exports = router;
