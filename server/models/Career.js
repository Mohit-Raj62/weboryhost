const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [100, "Job title cannot be more than 100 characters"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: [
        "Engineering",
        "Design",
        "Marketing",
        "Sales",
        "Human Resources",
        "Finance",
        "Operations",
      ],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Job type is required"],
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },
    requirements: {
      type: String,
      required: [true, "Job requirements are required"],
      trim: true,
    },
    responsibilities: {
      type: String,
      required: [true, "Job responsibilities are required"],
      trim: true,
    },
    salary: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["open", "closed", "draft"],
      default: "open",
    },
    applications: [
      {
        applicant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["pending", "reviewed", "shortlisted", "rejected"],
          default: "pending",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
        resume: String,
        coverLetter: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
careerSchema.index({ title: "text", description: "text", location: "text" });

// Virtual for getting the number of applications
careerSchema.virtual("applicationCount").get(function () {
  return this.applications.length;
});

// Method to check if a job is open for applications
careerSchema.methods.isOpen = function () {
  return this.status === "open";
};

// Method to add an application
careerSchema.methods.addApplication = async function (applicationData) {
  if (!this.isOpen()) {
    throw new Error("This position is no longer accepting applications");
  }
  this.applications.push(applicationData);
  return this.save();
};

// Method to update application status
careerSchema.methods.updateApplicationStatus = async function (
  applicationId,
  status
) {
  const application = this.applications.id(applicationId);
  if (!application) {
    throw new Error("Application not found");
  }
  application.status = status;
  return this.save();
};

const Career = mongoose.model("Career", careerSchema);

module.exports = Career;
