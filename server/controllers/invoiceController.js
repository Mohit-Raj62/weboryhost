const Invoice = require("../models/Invoice");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create invoice", details: error.message });
  }
};

// List/search invoices
exports.listInvoices = async (req, res) => {
  try {
    const { client, status } = req.query;
    let query = {};
    if (client) query.client = client;
    if (status) query.status = status;
    const invoices = await Invoice.find(query);
    res.json(invoices);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch invoices", details: error.message });
  }
};

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json(invoice);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch invoice", details: error.message });
  }
};

// Update invoice
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json(invoice);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update invoice", details: error.message });
  }
};

// Delete invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json({ message: "Invoice deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete invoice", details: error.message });
  }
};

// Mark invoice as paid
exports.markInvoicePaid = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        status: "paid",
        paymentDate: new Date(),
        paymentMethod: req.body.paymentMethod,
        paymentId: req.body.paymentId,
      },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({
      error: "Failed to mark invoice as paid",
      details: error.message,
    });
  }
};

// Create Stripe Checkout session for invoice payment
exports.createStripeCheckoutSession = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: invoice.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.description },
          unit_amount: Math.round(item.unitPrice * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/invoices/${invoice._id}?paid=1`,
      cancel_url: `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/invoices/${invoice._id}?canceled=1`,
      metadata: { invoiceId: invoice._id.toString() },
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create Stripe session",
      details: error.message,
    });
  }
};

// Stripe webhook for payment confirmation
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || "whsec_placeholder"
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const invoiceId = session.metadata.invoiceId;
    await Invoice.findByIdAndUpdate(invoiceId, {
      status: "paid",
      paymentDate: new Date(),
      paymentMethod: "stripe",
      paymentId: session.payment_intent,
    });
  }
  res.json({ received: true });
};

// Create a recurring invoice
exports.createRecurringInvoice = async (req, res) => {
  try {
    const { recurrenceInterval, ...invoiceData } = req.body;
    const nextDueDate = req.body.nextDueDate || new Date();
    const invoice = new Invoice({
      ...invoiceData,
      isRecurring: true,
      recurrenceInterval,
      nextDueDate,
    });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create recurring invoice",
      details: error.message,
    });
  }
};

// Send invoice reminder (mocked)
exports.sendInvoiceReminder = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { reminderSent: true, lastReminderDate: new Date() },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    // Here you would send an email
    res.json({ message: "Reminder sent", invoice });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send reminder", details: error.message });
  }
};
