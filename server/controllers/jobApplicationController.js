const JobApplication = require("../models/JobApplication");
const Career = require("../models/Career");

// Get all job applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .sort({ appliedDate: -1 })
      .populate("jobId", "title department");

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};

// Get application statistics
const getApplicationStats = async (req, res) => {
  try {
    const stats = await JobApplication.getStatistics();
    
    // Get department-wise statistics
    const departmentStats = await JobApplication.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 }
        }
      }
    ]);

    // Get recent applications (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentApplications = await JobApplication.countDocuments({
      appliedDate: { $gte: sevenDaysAgo }
    });

    res.status(200).json({
      success: true,
      data: {
        ...stats,
        departmentStats,
        recentApplications,
        totalJobs: await Career.countDocuments(),
      },
    });
  } catch (error) {
    console.error("Error fetching application stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch application statistics",
      error: error.message,
    });
  }
};

// Get applications by job ID
const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const applications = await JobApplication.find({ jobId })
      .sort({ appliedDate: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching applications by job:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications for this job",
      error: error.message,
    });
  }
};

// Get single application
const getApplication = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await JobApplication.findById(id)
      .populate("jobId", "title department");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
      error: error.message,
    });
  }
};

// Create new job application (public endpoint)
const createApplication = async (req, res) => {
  try {
    const {
      jobId,
      jobTitle,
      department,
      candidateName,
      email,
      phone,
      resume,
      coverLetter,
      portfolio,
      experience,
      skills,
    } = req.body;

    // Validate required fields
    if (!jobId || !candidateName || !email || !phone || !resume || !coverLetter) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if job exists and is open
    const job = await Career.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "This position is no longer accepting applications",
      });
    }

    // Create application
    const application = new JobApplication({
      jobId,
      jobTitle,
      department,
      candidateName,
      email,
      phone,
      resume,
      coverLetter,
      portfolio,
      experience,
      skills: skills || [],
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit application",
      error: error.message,
    });
  }
};

// Update application status (admin only)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const adminId = req.admin.id; // From auth middleware

    const application = await JobApplication.findById(id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Update status and notes
    application.status = status;
    application.notes = notes;
    application.reviewedBy = adminId;
    application.reviewedAt = new Date();

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update application status",
      error: error.message,
    });
  }
};

// Delete application (admin only)
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await JobApplication.findByIdAndDelete(id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete application",
      error: error.message,
    });
  }
};

// Get recent applications
const getRecentApplications = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const applications = await JobApplication.getRecent(parseInt(limit));

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Error fetching recent applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recent applications",
      error: error.message,
    });
  }
};

module.exports = {
  getAllApplications,
  getApplicationStats,
  getApplicationsByJob,
  getApplication,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
  getRecentApplications,
}; 