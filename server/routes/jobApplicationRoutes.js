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
const emailService = require("../utils/emailService");

// Public routes (for job applications) - These should be first
router.post("/", async (req, res) => {
  const { name, email, jobId } = req.body;
  const application = await createApplication(req.body);
  // User confirmation
  await emailService.sendEmail({
    to: email,
    subject: "Thank you for applying to Webory!",
    text: `Hi ${name},\n\nThank you for applying for the job (ID: ${jobId}) at Webory. We have received your application and our team will review it soon.\n\nBest of luck!\nWebory Careers Team`,
    html: `<div style='font-family:sans-serif;background:#f9f9f9;padding:24px;border-radius:12px;max-width:600px;margin:auto;'>
  <div style='text-align:center;margin-bottom:24px;'>
    <img src='https://yourdomain.com/logo.png' alt='Webory Logo' style='height:48px;'>
  </div>
  <div style='background:#fff;padding:24px;border-radius:8px;'>
    <h2 style='color:#6C63FF;'>Thank you for applying to Webory!</h2>
    <p style='color:#333;'>Hi ${name},</p>
    <p style='color:#333;'>Thank you for applying for the job (ID: <b>${jobId}</b>) at Webory. We have received your application and our team will review it soon.</p>
  </div>
  <div style='text-align:center;color:#888;margin-top:24px;font-size:13px;'>Webory Careers Team &copy; 2024</div>
</div>`,
  });
  // Admin notification
  await emailService.sendEmail({
    to: process.env.JOB_NOTIFICATION_EMAIL || process.env.EMAIL_FROM,
    subject: `New Job Application: ${jobId}`,
    text: `Job Application\n----------------------\nName: ${name}\nEmail: ${email}\nJob ID: ${jobId}`,
    html: `<div style='font-family:sans-serif;background:#f9f9f9;padding:24px;border-radius:12px;max-width:600px;margin:auto;'>
  <div style='text-align:center;margin-bottom:24px;'>
    <img src='https://yourdomain.com/logo.png' alt='Webory Logo' style='height:48px;'>
  </div>
  <div style='background:#fff;padding:24px;border-radius:8px;'>
    <h2 style='color:#6C63FF;'>New Job Application: ${jobId}</h2>
    <p style='color:#333;'>Name: ${name}</p>
    <p style='color:#333;'>Email: ${email}</p>
    <p style='color:#333;'>Job ID: ${jobId}</p>
  </div>
  <div style='text-align:center;color:#888;margin-top:24px;font-size:13px;'>Webory Careers Team &copy; 2024</div>
</div>`,
  });
  res.status(201).json(application);
});
router.get("/recent", getRecentApplications);

// Admin routes (protected) - These should be after public routes
router.get("/stats", adminAuth, getApplicationStats);
router.get("/job/:jobId", adminAuth, getApplicationsByJob);
router.get("/", adminAuth, getAllApplications);
router.get("/:id", adminAuth, getApplication);
router.put("/:id/status", adminAuth, updateApplicationStatus);
router.delete("/:id", adminAuth, deleteApplication);

module.exports = router;
