const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "editor"],
      default: "admin",
    },
    permissions: {
      manageUsers: {
        type: Boolean,
        default: false,
      },
      managePosts: {
        type: Boolean,
        default: false,
      },
      manageComments: {
        type: Boolean,
        default: false,
      },
      manageAdmins: {
        type: Boolean,
        default: false,
      },
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Set permissions based on role
adminSchema.pre("save", function (next) {
  switch (this.role) {
    case "admin":
      this.permissions = {
        manageUsers: true,
        managePosts: true,
        manageComments: true,
        manageAdmins: true,
      };
      break;
    case "moderator":
      this.permissions = {
        manageUsers: true,
        managePosts: true,
        manageComments: true,
        manageAdmins: false,
      };
      break;
    case "editor":
      this.permissions = {
        manageUsers: false,
        managePosts: true,
        manageComments: true,
        manageAdmins: false,
      };
      break;
  }
  next();
});

// Method to compare password
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
