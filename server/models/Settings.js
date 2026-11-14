const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    general: {
      companyName: { type: String, default: "Webory Agency" },
      email: { type: String, default: "contact@webory.com" },
      phone: { type: String, default: "+1 (555) 123-4567" },
      address: { type: String, default: "123 Business St, City, State 12345" },
      timezone: { type: String, default: "America/New_York" },
      currency: { type: String, default: "USD" },
      language: { type: String, default: "en" },
    },
    notifications: {
      emailNotifications: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true },
      projectUpdates: { type: Boolean, default: true },
      invoiceReminders: { type: Boolean, default: true },
      systemAlerts: { type: Boolean, default: true },
      marketingEmails: { type: Boolean, default: false },
    },
    security: {
      twoFactorAuth: { type: Boolean, default: false },
      sessionTimeout: { type: Number, default: 30 },
      passwordExpiry: { type: Number, default: 90 },
      loginAttempts: { type: Number, default: 5 },
      ipWhitelist: [{ type: String }],
    },
    integrations: {
      slack: {
        enabled: { type: Boolean, default: true },
        webhook: { type: String, default: "" },
        channel: { type: String, default: "#general" },
      },
      googleCalendar: {
        enabled: { type: Boolean, default: false },
        calendarId: { type: String, default: "" },
      },
      stripe: {
        enabled: { type: Boolean, default: true },
        publishableKey: { type: String, default: "" },
        secretKey: { type: String, default: "" },
      },
      mailchimp: {
        enabled: { type: Boolean, default: false },
        apiKey: { type: String, default: "" },
        listId: { type: String, default: "" },
      },
    },
    appearance: {
      theme: { type: String, default: "light" },
      sidebarCollapsed: { type: Boolean, default: false },
      compactMode: { type: Boolean, default: false },
      showAnimations: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);
