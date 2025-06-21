const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      default: "Webory",
    },
    siteDescription: {
      type: String,
      required: true,
      default: "Web Development Services",
    },
    contactEmail: {
      type: String,
      required: true,
      default: "contact@webory.com",
    },
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
    },
    theme: {
      primaryColor: {
        type: String,
        default: "#2196F3",
      },
      secondaryColor: {
        type: String,
        default: "#21CBF3",
      },
    },
    features: {
      enableBlog: {
        type: Boolean,
        default: true,
      },
      enableNewsletter: {
        type: Boolean,
        default: true,
      },
      enableContactForm: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);
