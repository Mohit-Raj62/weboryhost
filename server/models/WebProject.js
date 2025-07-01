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
    tasks: [
      {
        id: String,
        title: String,
        description: String,
        assignee: String,
        status: {
          type: String,
          enum: ["To Do", "In Progress", "Review", "Done"],
          default: "To Do",
        },
        dueDate: Date,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    team: [
      {
        type: String, // user ID or name
      },
    ],
    comments: [
      {
        id: String,
        user: String, // user ID or name
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    files: [
      {
        id: String,
        name: String,
        url: String,
        uploadedBy: String, // user ID or name
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    activityLogs: [
      {
        id: String,
        user: String, // user ID or name
        action: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WebProject", webProjectSchema);
