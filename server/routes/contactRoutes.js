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
      to: process.env.CONTACT_NOTIFICATION_EMAIL || process.env.EMAIL_FROM,
      subject: `New Contact Form Submission: ${subject}`,
      text: `Contact Form Submission\n----------------------\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      html: `<div style='font-family:sans-serif;background:#f9f9f9;padding:24px;border-radius:12px;max-width:600px;margin:auto;'>
  <div style='text-align:center;margin-bottom:24px;'>
    <img src='https://yourdomain.com/logo.png' alt='Webory Logo' style='height:48px;'>
  </div>
  <div style='background:#fff;padding:24px;border-radius:8px;'>
    <h2 style='color:#6C63FF;'>Thank you for contacting Webory!</h2>
    <p style='color:#333;'>Hi ${name},</p>
    <p style='color:#333;'>Thank you for reaching out to us. We have received your message regarding <b>${subject}</b> and will get back to you soon.</p>
  </div>
  <div style='text-align:center;color:#888;margin-top:24px;font-size:13px;'>Webory Team &copy; 2024</div>
</div>`,
    });
    // Send confirmation email to user
    await emailService.sendEmail({
      to: email,
      subject: "Thank you for contacting Webory!",
      text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message regarding "${subject}" and will get back to you soon.\n\nBest regards,\nWebory Team`,
      html: `<div style='font-family:sans-serif;background:#f9f9f9;padding:24px;border-radius:12px;max-width:600px;margin:auto;'>
  <div style='text-align:center;margin-bottom:24px;'>
    <img src='https://yourdomain.com/logo.png' alt='Webory Logo' style='height:48px;'>
  </div>
  <div style='background:#fff;padding:24px;border-radius:8px;'>
    <h2 style='color:#6C63FF;'>Thank you for contacting Webory!</h2>
    <p style='color:#333;'>Hi ${name},</p>
    <p style='color:#333;'>Thank you for reaching out to us. We have received your message regarding <b>${subject}</b> and will get back to you soon.</p>
  </div>
  <div style='text-align:center;color:#888;margin-top:24px;font-size:13px;'>Webory Team &copy; 2024</div>
</div>`,
    });

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form submission error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

const SupportTicket = require("../models/SupportTicket");

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

    // Save to SupportTicket model
    const supportTicket = new SupportTicket({
      user: null, // Will be null for non-authenticated users
      subject,
      email,
      message: `${message}\n\nCategory: ${category}\nTicket Number: ${ticketNumber}`,
      priority,
      status: "open",
    });

    await supportTicket.save();

    // Send notification email (to admin)
    await emailService.sendEmail({
      to: process.env.SUPPORT_NOTIFICATION_EMAIL || process.env.EMAIL_FROM,
      subject: `New Support Ticket [#${ticketNumber}]: ${subject}`,
      text: `Support Ticket\n----------------------\nTicket Number: ${ticketNumber}\nName: ${name}\nEmail: ${email}\nPriority: ${priority}\nCategory: ${category}\nMessage: ${message}`,
      html: `<div style='font-family:sans-serif;background:#f9f9f9;padding:24px;border-radius:12px;max-width:600px;margin:auto;'>
  <div style='text-align:center;margin-bottom:24px;'>
    <img src='https://yourdomain.com/logo.png' alt='Webory Logo' style='height:48px;'>
  </div>
  <div style='background:#fff;padding:24px;border-radius:8px;'>
    <h2 style='color:#6C63FF;'>New Support Ticket</h2>
    <p><b>Ticket Number:</b> ${ticketNumber}</p>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Priority:</b> ${priority}</p>
    <p><b>Category:</b> ${category}</p>
    <p><b>Message:</b> ${message}</p>
  </div>
  <div style='text-align:center;color:#888;margin-top:24px;font-size:13px;'>Webory Team &copy; 2024</div>
</div>`,
    });
    // Send confirmation email to user
    await emailService.sendEmail({
      to: email,
      subject: "Your support ticket has been received! [Webory]",
      text: `Hi ${name},\n\nThank you for submitting a support ticket. Your ticket number is ${ticketNumber}. Our team will review your request and get back to you as soon as possible.\n\nBest regards,\nWebory Support Team`,
      html: `<div style='font-family:sans-serif;background:#f9f9f9;padding:24px;border-radius:12px;max-width:600px;margin:auto;'>
  <div style='text-align:center;margin-bottom:24px;'>
    <img src='https://yourdomain.com/logo.png' alt='Webory Logo' style='height:48px;'>
  </div>
  <div style='background:#fff;padding:24px;border-radius:8px;'>
    <h2 style='color:#6C63FF;'>Your support ticket has been received!</h2>
    <p>Hi ${name},</p>
    <p>Thank you for submitting a support ticket. Your ticket number is <b>${ticketNumber}</b>. Our team will review your request and get back to you as soon as possible.</p>
  </div>
  <div style='text-align:center;color:#888;margin-top:24px;font-size:13px;'>Webory Team &copy; 2024</div>
</div>`,
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
