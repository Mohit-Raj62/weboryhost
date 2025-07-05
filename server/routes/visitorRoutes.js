const express = require("express");
const router = express.Router();
const Visitor = require("../models/Visitor");
const Visit = require("../models/Visit");

// Get visitor count
router.get("/visitor-count", async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    const count = visitor ? visitor.count : 0;
    res.status(200).json({ success: true, count });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching visitor count" });
  }
});

// Get visit stats (daily and monthly)
router.get("/visit-stats", async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const dailyCount = await Visit.countDocuments({
      timestamp: { $gte: startOfDay },
    });
    const monthlyCount = await Visit.countDocuments({
      timestamp: { $gte: startOfMonth },
    });

    res
      .status(200)
      .json({ success: true, daily: dailyCount, monthly: monthlyCount });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching visit stats" });
  }
});

// Get daily visit stats for chart
router.get("/visit-stats-daily", async (req, res) => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 1);

    const dailyCounts = await Visit.aggregate([
      { $match: { timestamp: { $gte: startOfMonth, $lt: endOfMonth } } },
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            day: { $dayOfMonth: "$timestamp" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day",
                },
              },
            },
          },
          count: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.status(200).json({ success: true, dailyCounts });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching daily visit stats" });
  }
});

// Track a visit
router.post("/track-visit", async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = new Visitor({ count: 1 });
    } else {
      visitor.count += 1;
    }
    await visitor.save();

    // Also record the visit for daily/monthly tracking
    await Visit.create({});

    res.status(200).json({ success: true, count: visitor.count });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error tracking visit" });
  }
});

module.exports = router;
