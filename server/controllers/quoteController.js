const Quote = require('../models/Quote');

// Create a new service request (quote)
exports.createQuote = async (req, res) => {
  try {
    const { name, email, phone, company, service, budget, message, timeline } = req.body;
    const quote = new Quote({ name, email, phone, company, service, budget, message, timeline });
    await quote.save();
    res.status(201).json({ success: true, message: 'Service request submitted successfully', quote });
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({ success: false, message: 'Failed to submit service request', error: error.message });
  }
};

// Get all service requests (for admin dashboard)
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ success: true, quotes });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch service requests', error: error.message });
  }
};

// PATCH: Update status of a quote (accept/reject)
exports.updateQuoteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }
    const updated = await Quote.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }
    res.json({ success: true, quote: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update status', error: error.message });
  }
}; 