const mongoose = require("mongoose");

const webProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["planning", "in-progress", "review", "completed", "maintenance"],
      default: "planning",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    technologies: [
      {
        type: String,
      },
    ],
    features: [
      {
        type: String,
      },
    ],
    url: String,
    repository: String,
    screenshots: [
      {
        url: String,
        caption: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WebProject", webProjectSchema);
