const Settings = require("../models/Settings");
const ActivityLog = require("../models/ActivityLog");

async function logAdminActivity(adminId, action, details) {
  try {
    await ActivityLog.create({ admin: adminId, action, details });
  } catch (e) {
    /* ignore logging errors */
  }
}

exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    // Log admin activity if admin info is available
    if (req.admin) {
      await logAdminActivity(req.admin._id, "update_settings", req.body);
    }
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: "Failed to update settings" });
  }
};
