const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.post("/", invoiceController.createInvoice);
router.get("/", invoiceController.listInvoices);
router.get("/:id", invoiceController.getInvoiceById);
router.put("/:id", invoiceController.updateInvoice);
router.delete("/:id", invoiceController.deleteInvoice);
router.post("/:id/pay", invoiceController.markInvoicePaid);
router.post(
  "/:id/stripe-session",
  invoiceController.createStripeCheckoutSession
);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  invoiceController.stripeWebhook
);
router.post("/recurring", invoiceController.createRecurringInvoice);
router.post("/:id/reminder", invoiceController.sendInvoiceReminder);

module.exports = router;
