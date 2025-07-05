const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: [true, "Job ID is required"],
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    candidateName: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    resume: {
      type: String,
      required: [true, "Resume is required"],
    },
    coverLetter: {
      type: String,
      required: [true, "Cover letter is required"],
    },
    portfolio: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected", "hired"],
      default: "pending",
    },
    notes: {
      type: String,
      trim: true,
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    reviewedAt: {
      type: Date,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
jobApplicationSchema.index({ jobId: 1, status: 1 });
jobApplicationSchema.index({ email: 1 });
jobApplicationSchema.index({ appliedDate: -1 });
jobApplicationSchema.index({ status: 1 });

// Virtual for formatted applied date
jobApplicationSchema.virtual("formattedAppliedDate").get(function () {
  return this.appliedDate.toLocaleDateString();
});

// Method to update status
jobApplicationSchema.methods.updateStatus = async function (
  newStatus,
  adminId
) {
  this.status = newStatus;
  this.reviewedBy = adminId;
  this.reviewedAt = new Date();
  return this.save();
};

// Static method to get application statistics
jobApplicationSchema.statics.getStatistics = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const total = await this.countDocuments();
  const result = {
    total,
    pending: 0,
    shortlisted: 0,
    rejected: 0,
    hired: 0,
  };

  stats.forEach((stat) => {
    result[stat._id] = stat.count;
  });

  return result;
};

// Static method to get applications by job
jobApplicationSchema.statics.getByJob = async function (jobId) {
  return this.find({ jobId }).sort({ appliedDate: -1 });
};

// Static method to get recent applications
jobApplicationSchema.statics.getRecent = async function (limit = 10) {
  return this.find().sort({ appliedDate: -1 }).limit(limit);
};

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
