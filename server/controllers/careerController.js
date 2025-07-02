const Career = require("../models/Career");

exports.getCareers = async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch careers" });
  }
};

exports.createCareer = async (req, res) => {
  try {
    const career = new Career({ ...req.body, createdBy: req.admin._id });
    await career.save();
    res.status(201).json(career);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch career" });
  }
};

exports.updateCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.admin._id },
      { new: true }
    );
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.json(career);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.json({ message: "Career deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete career" });
  }
};
