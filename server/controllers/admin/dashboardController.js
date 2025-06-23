const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

const getDashboardStats = async (req, res, next) => {
  try {
    const [totalUsers, totalPosts, totalComments, activeUsers] =
      await Promise.all([
        User.countDocuments(),
        Post.countDocuments(),
        Comment.countDocuments(),
        User.countDocuments({
          lastActive: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        }),
      ]);
    res.json({ totalUsers, totalPosts, totalComments, activeUsers });
  } catch (error) {
    next(error);
  }
};

const getRecentActivity = async (req, res, next) => {
  try {
    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "name");
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email createdAt");
    const recentComments = await Comment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "name")
      .populate("post", "title");
    res.json({ recentPosts, recentUsers, recentComments });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats, getRecentActivity };
