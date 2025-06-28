const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Contact = require("../../models/Contact");
const SupportTicket = require("../../models/SupportTicket");
const mongoose = require("mongoose");

// Enhanced dashboard stats with comprehensive analytics
const getDashboardStats = async (req, res, next) => {
  try {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Basic counts
    const [totalUsers, totalPosts, totalComments, totalContacts, totalTickets] =
      await Promise.all([
        User.countDocuments(),
        Post.countDocuments(),
        Comment.countDocuments(),
        Contact.countDocuments(),
        SupportTicket.countDocuments(),
      ]);

    // Recent activity counts
    const [
      newUsers24h,
      newPosts24h,
      newComments24h,
      newContacts24h,
      newTickets24h,
    ] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: last24Hours } }),
      Post.countDocuments({ createdAt: { $gte: last24Hours } }),
      Comment.countDocuments({ createdAt: { $gte: last24Hours } }),
      Contact.countDocuments({ createdAt: { $gte: last24Hours } }),
      SupportTicket.countDocuments({ createdAt: { $gte: last24Hours } }),
    ]);

    // User engagement metrics
    const activeUsers = await User.countDocuments({
      lastActive: { $gte: last24Hours },
    });

    // Role distribution
    const roleStats = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    const roleDistribution = roleStats.reduce(
      (acc, role) => {
        acc[role._id || "user"] = role.count;
        return acc;
      },
      { admin: 0, moderator: 0, author: 0, user: 0 }
    );

    // Growth trends (last 7 days)
    const userGrowth = await User.aggregate([
      {
        $match: { createdAt: { $gte: last7Days } },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Content engagement
    const topPosts = await Post.aggregate([
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
      { $limit: 5 },
      {
        $project: {
          title: 1,
          commentCount: 1,
          createdAt: 1,
        },
      },
    ]);

    // System health metrics
    const systemHealth = {
      database: "connected",
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      timestamp: now,
    };

    res.json({
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
      userGrowth,

      // Content analytics
      topPosts,

      // System health
      systemHealth,

      // Performance metrics
      responseTime: Date.now() - req.startTime,
      timestamp: now,
    });
  } catch (error) {
    next(error);
  }
};

// Enhanced recent activity with more detailed information
const getRecentActivity = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type; // 'all', 'users', 'posts', 'comments', 'contacts', 'tickets'

    let activities = [];

    if (!type || type === "all" || type === "users") {
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
    }

    if (!type || type === "all" || type === "posts") {
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
    }

    if (!type || type === "all" || type === "comments") {
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
    }

    if (!type || type === "all" || type === "contacts") {
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
    }

    if (!type || type === "all" || type === "tickets") {
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
    next(error);
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
    const userGrowth = await User.aggregate([
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

    // Content creation trends
    const postTrends = await Post.aggregate([
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

    // Engagement metrics
    const engagementMetrics = await Comment.aggregate([
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

    // Top performing content
    const topContent = await Post.aggregate([
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

    // User activity heatmap
    const userActivity = await User.aggregate([
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
    next(error);
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
        collections: await mongoose.connection.db.listCollections().toArray(),
      },
      environment: process.env.NODE_ENV || "development",
      version: process.version,
    };

    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      health.status = "degraded";
      health.database.status = "disconnected";
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
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getRecentActivity,
  getAnalytics,
  getSystemHealth,
};
