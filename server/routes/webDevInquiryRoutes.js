const express = require("express");
const router = express.Router();
const WebDevInquiry = require("../models/WebDevInquiry");

// POST /api/webdev-inquiries - Save a new inquiry
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message, selectedPlan } = req.body;
    const inquiry = new WebDevInquiry({
      name,
      email,
      phone,
      message,
      selectedPlan,
    });
    await inquiry.save();
    res.status(201).json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/webdev-inquiries - Get all inquiries
router.get("/", async (req, res) => {
  try {
    const inquiries = await WebDevInquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
