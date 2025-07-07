const SupportTicket = require("../models/SupportTicket");
const User = require("../models/User");
const Admin = require("../models/Admin");

// Get all support tickets with pagination and filtering
const getAllTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, search } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    // Filter by status
    if (status && status !== "all") {
      query.status = status;
    }

    // Filter by priority
    if (priority && priority !== "all") {
      query.priority = priority;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const tickets = await SupportTicket.find(query)
      .populate("user", "name email")
      .populate("responses.responder", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await SupportTicket.countDocuments(query);

    res.json({
      tickets,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

// Get ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id)
      .populate("user", "name email")
      .populate("responses.responder", "name email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ message: "Failed to fetch ticket" });
  }
};

// Create new support ticket
const createTicket = async (req, res) => {
  try {
    console.log("=== SUPPORT TICKET CREATION ===");
    console.log("Request body:", req.body);

    const {
      subject,
      email,
      message,
      priority = "medium",
      userId,
      ticketNumber,
      userName,
      issueType,
    } = req.body;

    console.log("Extracted fields:", {
      subject,
      email,
      message,
      priority,
      userId,
      ticketNumber,
      userName,
      issueType,
    });

    // Validate required fields
    if (!subject || !email || !message) {
      console.error("Validation failed: Missing required fields", {
        subject,
        email,
        message,
      });
      return res
        .status(400)
        .json({ message: "Subject, email, and message are required" });
    }

    // Create ticket
    const ticket = new SupportTicket({
      user: userId,
      subject,
      email,
      message,
      priority,
      status: "open",
      ticketNumber,
      userName,
      issueType,
    });

    console.log("Ticket object before save:", ticket);

    await ticket.save();

    console.log("Ticket saved successfully:", ticket._id);

    // Populate user info
    await ticket.populate("user", "name email");

    res.status(201).json({
      message: "Support ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    if (error.stack) {
      console.error("Error stack:", error.stack);
    }
    if (req && req.body) {
      console.error("Request body at error:", req.body);
    }
    res
      .status(500)
      .json({
        message: "Failed to create ticket",
        error: error.message,
        stack: error.stack,
      });
  }
};

// Update ticket status
const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["open", "in-progress", "resolved", "closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const ticket = await SupportTicket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("user", "name email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({
      message: "Ticket status updated successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({ message: "Failed to update ticket status" });
  }
};

// Add response to ticket
const addResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const adminId = req.admin.id; // From auth middleware

    if (!message) {
      return res.status(400).json({ message: "Response message is required" });
    }

    const ticket = await SupportTicket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.responses.push({
      responder: adminId,
      message,
    });

    // Update status to in-progress if it was open
    if (ticket.status === "open") {
      ticket.status = "in-progress";
    }

    await ticket.save();
    await ticket.populate("responses.responder", "name email");

    res.json({
      message: "Response added successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error adding response:", error);
    res.status(500).json({ message: "Failed to add response" });
  }
};

// Get ticket statistics
const getTicketStats = async (req, res) => {
  try {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,
      newTickets24h,
      newTickets7d,
      newTickets30d,
      priorityStats,
      statusStats,
    ] = await Promise.all([
      SupportTicket.countDocuments(),
      SupportTicket.countDocuments({ status: "open" }),
      SupportTicket.countDocuments({ status: "in-progress" }),
      SupportTicket.countDocuments({ status: "resolved" }),
      SupportTicket.countDocuments({ status: "closed" }),
      SupportTicket.countDocuments({ createdAt: { $gte: last24Hours } }),
      SupportTicket.countDocuments({ createdAt: { $gte: last7Days } }),
      SupportTicket.countDocuments({ createdAt: { $gte: last30Days } }),
      SupportTicket.aggregate([
        { $group: { _id: "$priority", count: { $sum: 1 } } },
      ]),
      SupportTicket.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const avgResponseTime = await SupportTicket.aggregate([
      {
        $match: {
          "responses.0": { $exists: true },
        },
      },
      {
        $addFields: {
          responseTime: {
            $subtract: [
              { $arrayElemAt: ["$responses.createdAt", 0] },
              "$createdAt",
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          avgResponseTime: { $avg: "$responseTime" },
        },
      },
    ]);

    res.json({
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,
      newTickets24h,
      newTickets7d,
      newTickets30d,
      priorityStats: priorityStats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      statusStats: statusStats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      avgResponseTime: avgResponseTime[0]?.avgResponseTime || 0,
    });
  } catch (error) {
    console.error("Error fetching ticket stats:", error);
    res.status(500).json({ message: "Failed to fetch ticket statistics" });
  }
};

// Delete ticket
const deleteTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ message: "Failed to delete ticket" });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
  addResponse,
  getTicketStats,
  deleteTicket,
};
