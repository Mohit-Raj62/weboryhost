const Admin = require("../models/Admin");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcryptjs");

// Role management functions
const getRoles = async (req, res) => {
  try {
    // Return predefined roles with their permissions
    const roles = {
      admin: {
        name: "Administrator",
        description: "Full access to all features and settings",
        permissions: [
          "manage_users",
          "manage_roles",
          "manage_posts",
          "manage_comments",
          "manage_settings",
        ],
      },
      moderator: {
        name: "Moderator",
        description: "Can manage content and moderate users",
        permissions: ["manage_posts", "manage_comments", "moderate_users"],
      },
      author: {
        name: "Author",
        description: "Can create and manage their own content",
        permissions: [
          "create_posts",
          "edit_own_posts",
          "delete_own_posts",
          "manage_own_comments",
        ],
      },
      user: {
        name: "User",
        description: "Basic user access",
        permissions: [
          "view_posts",
          "create_comments",
          "edit_own_comments",
          "delete_own_comments",
        ],
      },
    };

    res.json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

const updateRole = async (req, res) => {
  try {
    const { role } = req.params;
    const { permissions } = req.body;

    // Validate role
    const validRoles = ["admin", "moderator", "author", "user"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // For now, just return success (in a real app, you'd update a database)
    res.json({
      message: `Role ${role} updated successfully`,
      role,
      permissions,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: "Failed to update role" });
  }
};

const createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    if (!name || !permissions) {
      return res
        .status(400)
        .json({ error: "Name and permissions are required" });
    }

    // For now, just return success (in a real app, you'd save to database)
    res.status(201).json({
      message: "Role created successfully",
      role: { name, description, permissions },
    });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: "Failed to create role" });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { role } = req.params;

    // Validate role
    const validRoles = ["admin", "moderator", "author", "user"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // For now, just return success (in a real app, you'd delete from database)
    res.json({ message: `Role ${role} deleted successfully` });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ error: "Failed to delete role" });
  }
};

// Only keep the remaining functions (dashboard, users, posts, comments, user/post/comment management)

const getDashboard = async (req, res) => {
  res.json({ message: "Dashboard data" });
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author", "name email");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("author", "name email")
      .populate("post", "title");
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { isActive: status },
      { new: true }
    ).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ error: "Failed to update user status" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
const updatePostStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const post = await Post.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("author", "name email");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error updating post status:", error);
    res.status(500).json({ error: "Failed to update post status" });
  }
};
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
const updateCommentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("author", "name email");
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    console.error("Error updating comment status:", error);
    res.status(500).json({ error: "Failed to update comment status" });
  }
};
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

module.exports = {
  getDashboard,
  getUsers,
  getPosts,
  getComments,
  getRoles,
  updateRole,
  createRole,
  deleteRole,
  updateUserStatus,
  deleteUser,
  updatePostStatus,
  deletePost,
  updateCommentStatus,
  deleteComment,
};
