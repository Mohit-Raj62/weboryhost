const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Contact = require("../../models/Contact");
const SupportTicket = require("../../models/SupportTicket");
const mongoose = require("mongoose");

// Enhanced dashboard stats with comprehensive analytics
const getDashboardStats = async (req, res, next) => {
  try {
    console.log("Dashboard stats request received");

    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Basic counts with error handling
    let totalUsers = 0,
      totalPosts = 0,
      totalComments = 0,
      totalContacts = 0,
      totalTickets = 0;
    let newUsers24h = 0,
      newPosts24h = 0,
      newComments24h = 0,
      newContacts24h = 0,
      newTickets24h = 0;
    let activeUsers = 0;

    try {
      totalUsers = await User.countDocuments();
    } catch (err) {
      console.log("Error counting users:", err.message);
    }

    try {
      totalPosts = await Post.countDocuments();
    } catch (err) {
      console.log("Error counting posts:", err.message);
    }

    try {
      totalComments = await Comment.countDocuments();
    } catch (err) {
      console.log("Error counting comments:", err.message);
    }

    try {
      totalContacts = await Contact.countDocuments();
    } catch (err) {
      console.log("Error counting contacts:", err.message);
    }

    try {
      totalTickets = await SupportTicket.countDocuments();
    } catch (err) {
      console.log("Error counting tickets:", err.message);
    }

    // Recent activity counts
    try {
      newUsers24h = await User.countDocuments({
        createdAt: { $gte: last24Hours },
      });
    } catch (err) {
      console.log("Error counting new users:", err.message);
    }

    try {
      newPosts24h = await Post.countDocuments({
        createdAt: { $gte: last24Hours },
      });
    } catch (err) {
      console.log("Error counting new posts:", err.message);
    }

    try {
      newComments24h = await Comment.countDocuments({
        createdAt: { $gte: last24Hours },
      });
    } catch (err) {
      console.log("Error counting new comments:", err.message);
    }

    try {
      newContacts24h = await Contact.countDocuments({
        createdAt: { $gte: last24Hours },
      });
    } catch (err) {
      console.log("Error counting new contacts:", err.message);
    }

    try {
      newTickets24h = await SupportTicket.countDocuments({
        createdAt: { $gte: last24Hours },
      });
    } catch (err) {
      console.log("Error counting new tickets:", err.message);
    }

    // User engagement metrics
    try {
      activeUsers = await User.countDocuments({
        lastActive: { $gte: last24Hours },
      });
    } catch (err) {
      console.log("Error counting active users:", err.message);
    }

    // Role distribution
    let roleStats = [];
    try {
      roleStats = await User.aggregate([
        {
          $group: {
            _id: "$role",
            count: { $sum: 1 },
          },
        },
      ]);
    } catch (err) {
      console.log("Error getting role stats:", err.message);
    }

    const roleDistribution = roleStats.reduce(
      (acc, role) => {
        acc[role._id || "user"] = role.count;
        return acc;
      },
      { admin: 0, moderator: 0, author: 0, user: 0 }
    );

    // System health metrics
    const systemHealth = {
      database:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      timestamp: now,
    };

    const response = {
      // Basic stats
      totalUsers,
      totalPosts,
      totalComments,
      totalContacts,
      totalTickets,
      activeUsers,

      // Recent activity
      newUsers24h,
      newPosts24h,
      newComments24h,
      newContacts24h,
      newTickets24h,

      // Role distribution
      roleStats: roleDistribution,

      // Growth trends
      userGrowth: [],

      // Content analytics
      topPosts: [],

      // System health
      systemHealth,

      // Performance metrics
      responseTime: req.startTime ? Date.now() - req.startTime : 0,
      timestamp: now,
    };

    console.log("Dashboard stats response:", response);
    res.json(response);
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      error: "Failed to fetch dashboard stats",
      message: error.message,
      timestamp: new Date(),
    });
  }
};

// Enhanced recent activity with more detailed information
const getRecentActivity = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type; // 'all', 'users', 'posts', 'comments', 'contacts', 'tickets'

    let activities = [];

    if (!type || type === "all" || type === "users") {
      try {
        const recentUsers = await User.find()
          .sort({ createdAt: -1 })
          .limit(limit)
          .select("name email createdAt role lastActive");

        activities.push(
          ...recentUsers.map((user) => ({
            type: "user_registration",
            title: `New user registered: ${user.name}`,
            description: `${user.email} joined as ${user.role}`,
            timestamp: user.createdAt,
            data: user,
          }))
        );
      } catch (err) {
        console.log("Error fetching recent users:", err.message);
      }
    }

    if (!type || type === "all" || type === "posts") {
      try {
        const recentPosts = await Post.find()
          .sort({ createdAt: -1 })
          .limit(limit)
          .populate("author", "name email");

        activities.push(
          ...recentPosts.map((post) => ({
            type: "post_created",
            title: `New post: ${post.title}`,
            description: `Created by ${post.author?.name || "Unknown"}`,
            timestamp: post.createdAt,
            data: post,
          }))
        );
      } catch (err) {
        console.log("Error fetching recent posts:", err.message);
      }
    }

    if (!type || type === "all" || type === "comments") {
      try {
        const recentComments = await Comment.find()
          .sort({ createdAt: -1 })
          .limit(limit)
          .populate("author", "name")
          .populate("post", "title");

        activities.push(
          ...recentComments.map((comment) => ({
            type: "comment_added",
            title: `New comment on: ${comment.post?.title || "Unknown post"}`,
            description: `By ${comment.author?.name || "Unknown"}`,
            timestamp: comment.createdAt,
            data: comment,
          }))
        );
      } catch (err) {
        console.log("Error fetching recent comments:", err.message);
      }
    }

    if (!type || type === "all" || type === "contacts") {
      try {
        const recentContacts = await Contact.find()
          .sort({ createdAt: -1 })
          .limit(limit);

        activities.push(
          ...recentContacts.map((contact) => ({
            type: "contact_form",
            title: `New contact form submission`,
            description: `From ${contact.name} (${contact.email})`,
            timestamp: contact.createdAt,
            data: contact,
          }))
        );
      } catch (err) {
        console.log("Error fetching recent contacts:", err.message);
      }
    }

    if (!type || type === "all" || type === "tickets") {
      try {
        const recentTickets = await SupportTicket.find()
          .sort({ createdAt: -1 })
          .limit(limit);

        activities.push(
          ...recentTickets.map((ticket) => ({
            type: "support_ticket",
            title: `New support ticket: ${ticket.subject}`,
            description: `Priority: ${ticket.priority}, Status: ${ticket.status}`,
            timestamp: ticket.createdAt,
            data: ticket,
          }))
        );
      } catch (err) {
        console.log("Error fetching recent tickets:", err.message);
      }
    }

    // Sort all activities by timestamp and limit
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    activities = activities.slice(0, limit);

    res.json({
      activities,
      total: activities.length,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Recent activity error:", error);
    res.status(500).json({
      error: "Failed to fetch recent activity",
      message: error.message,
      timestamp: new Date(),
    });
  }
};

// New analytics endpoint for detailed insights
const getAnalytics = async (req, res, next) => {
  try {
    const period = req.query.period || "30d"; // 7d, 30d, 90d, 1y
    const now = new Date();

    let startDate;
    switch (period) {
      case "7d":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "1y":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // User growth over time
    let userGrowth = [];
    try {
      userGrowth = await User.aggregate([
        {
          $match: { createdAt: { $gte: startDate } },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
    } catch (err) {
      console.log("Error getting user growth:", err.message);
    }

    // Content creation trends
    let postTrends = [];
    try {
      postTrends = await Post.aggregate([
        {
          $match: { createdAt: { $gte: startDate } },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
    } catch (err) {
      console.log("Error getting post trends:", err.message);
    }

    // Engagement metrics
    let engagementMetrics = [];
    try {
      engagementMetrics = await Comment.aggregate([
        {
          $match: { createdAt: { $gte: startDate } },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
    } catch (err) {
      console.log("Error getting engagement metrics:", err.message);
    }

    // Top performing content
    let topContent = [];
    try {
      topContent = await Post.aggregate([
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "post",
            as: "comments",
          },
        },
        {
          $addFields: {
            commentCount: { $size: "$comments" },
          },
        },
        { $sort: { commentCount: -1 } },
        { $limit: 10 },
        {
          $project: {
            title: 1,
            commentCount: 1,
            createdAt: 1,
            author: 1,
          },
        },
      ]);
    } catch (err) {
      console.log("Error getting top content:", err.message);
    }

    // User activity heatmap
    let userActivity = [];
    try {
      userActivity = await User.aggregate([
        {
          $match: { lastActive: { $gte: startDate } },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$lastActive" } },
            activeUsers: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
    } catch (err) {
      console.log("Error getting user activity:", err.message);
    }

    res.json({
      period,
      startDate,
      endDate: now,
      userGrowth,
      postTrends,
      engagementMetrics,
      topContent,
      userActivity,
      summary: {
        totalUsers: userGrowth.reduce((sum, day) => sum + day.count, 0),
        totalPosts: postTrends.reduce((sum, day) => sum + day.count, 0),
        totalComments: engagementMetrics.reduce(
          (sum, day) => sum + day.count,
          0
        ),
        avgDailyUsers:
          userActivity.length > 0
            ? userActivity.reduce((sum, day) => sum + day.activeUsers, 0) /
              userActivity.length
            : 0,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({
      error: "Failed to fetch analytics",
      message: error.message,
      timestamp: new Date(),
    });
  }
};

// System health and performance monitoring
const getSystemHealth = async (req, res, next) => {
  try {
    const health = {
      status: "healthy",
      timestamp: new Date(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: {
        status: "connected",
        collections: [],
      },
      environment: process.env.NODE_ENV || "development",
      version: process.version,
    };

    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      health.status = "degraded";
      health.database.status = "disconnected";
    } else {
      try {
        health.database.collections = await mongoose.connection.db
          .listCollections()
          .toArray();
      } catch (err) {
        console.log("Error getting collections:", err.message);
      }
    }

    // Check memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsagePercent =
      (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;

    if (memoryUsagePercent > 80) {
      health.status = "warning";
      health.memory.warning = "High memory usage detected";
    }

    res.json(health);
  } catch (error) {
    console.error("System health error:", error);
    res.status(500).json({
      error: "Failed to get system health",
      message: error.message,
      timestamp: new Date(),
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentActivity,
  getAnalytics,
  getSystemHealth,
};
