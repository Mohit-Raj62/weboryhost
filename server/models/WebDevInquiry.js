const mongoose = require("mongoose");

const webDevInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    selectedPlan: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const WebDevInquiry = mongoose.model("WebDevInquiry", webDevInquirySchema);

module.exports = WebDevInquiry;
