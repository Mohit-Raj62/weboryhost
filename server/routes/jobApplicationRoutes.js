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
const { adminAuth } = require("../middleware/adminAuth");

// Public routes (for job applications)
router.post("/", createApplication);
router.get("/recent", getRecentApplications);

// Admin routes (protected)
router.get("/", adminAuth, getAllApplications);
router.get("/stats", adminAuth, getApplicationStats);
router.get("/job/:jobId", adminAuth, getApplicationsByJob);
router.get("/:id", adminAuth, getApplication);
router.put("/:id/status", adminAuth, updateApplicationStatus);
router.delete("/:id", adminAuth, deleteApplication);

module.exports = router;
