const express = require("express");
const router = express.Router();
const supportTicketController = require("../controllers/supportTicketController");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");
const SupportTicket = require("../models/SupportTicket");

// Public routes (for users to create tickets)
router.post("/create", auth, supportTicketController.createTicket);
// Public route for creating tickets without authentication
router.post("/create-public", supportTicketController.createTicket);

// Admin routes (protected)
router.get("/admin/all", adminAuth, supportTicketController.getAllTickets);
router.get("/admin/stats", adminAuth, supportTicketController.getTicketStats);
router.get("/admin/:id", adminAuth, supportTicketController.getTicketById);
router.put(
  "/admin/:id/status",
  adminAuth,
  supportTicketController.updateTicketStatus
);
router.post(
  "/admin/:id/response",
  adminAuth,
  supportTicketController.addResponse
);
router.delete("/admin/:id", adminAuth, supportTicketController.deleteTicket);

// User routes (for users to view their own tickets)
router.get("/my-tickets", auth, async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

module.exports = router;
 