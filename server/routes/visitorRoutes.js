const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorController");

// Route to increment visitor count
router.post("/track-visit", visitorController.incrementVisitorCount);

// Route to get visitor count (for admin)
router.get("/visitor-count", visitorController.getVisitorCount);

// Route to record a visit (for daily/monthly tracking)
router.post("/record-visit", visitorController.recordVisit);

// Route to get daily and monthly visit stats
router.get("/visit-stats", visitorController.getVisitStats);

// Route to get daily visit stats for the current month (for chart)
router.get("/visit-stats-daily", visitorController.getDailyVisitStats);

module.exports = router;
