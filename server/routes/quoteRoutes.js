const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController");

// Public: Submit a new service request (quote)
router.post("/", quoteController.createQuote);

// Admin: Get all service requests (quotes)
router.get("/", quoteController.getAllQuotes);

// PATCH: Update status of a quote (accept/reject)
router.patch("/:id/status", quoteController.updateQuoteStatus);

module.exports = router;
