const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
const emailService = require("../utils/emailService");

// Submit contact form
router.post("/submit", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new contact submission
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      status: "pending",
    });

    await contact.save();

    // Send notification email (to admin or support)
    await emailService.sendEmail({
      email: process.env.CONTACT_NOTIFICATION_EMAIL || process.env.EMAIL_FROM,
      subject: `New Contact Form Submission: ${subject}`,
      message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    });

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form submission error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// Submit support ticket
router.post("/support", async (req, res) => {
  try {
    const { name, email, subject, message, priority, category } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message || !priority || !category) {
      return res
        .status(400)
        .json({ message: "All fields are required for a support ticket" });
    }

    // Create a unique ticket number
    const ticketNumber = `TICKET-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;

    // Here you would typically save to a SupportTicket model
    // For now, we'll log it and send an email
    console.log("New Support Ticket:", {
      ticketNumber,
      name,
      email,
      subject,
      message,
      priority,
      category,
    });

    // Send notification email
    await emailService.sendEmail({
      to: process.env.SUPPORT_NOTIFICATION_EMAIL || process.env.EMAIL_FROM,
      subject: `New Support Ticket [#${ticketNumber}]: ${subject}`,
      text: `A new support ticket has been created.\n\nTicket Number: ${ticketNumber}\nName: ${name}\nEmail: ${email}\nPriority: ${priority}\nCategory: ${category}\n\nMessage:\n${message}`,
    });

    res.status(201).json({
      message: "Support ticket created successfully",
      ticketNumber,
    });
  } catch (error) {
    console.error("Support ticket submission error:", error);
    res.status(500).json({ message: "Failed to create support ticket" });
  }
});

// Get all contact submissions (admin only)
router.get("/all", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

// Update contact status (admin only)
router.put("/:id/status", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.status = status;
    await contact.save();

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
});

// Delete contact submission (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await contact.remove();
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Failed to delete contact" });
  }
});

module.exports = router;
