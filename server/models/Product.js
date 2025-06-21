const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "active",
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    specifications: {
      type: Map,
      of: String,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
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
productSchema.index({ name: "text", description: "text", category: "text" });

// Virtual for product URL
productSchema.virtual("url").get(function () {
  return `/products/${this._id}`;
});

// Method to check if product is in stock
productSchema.methods.isInStock = function () {
  return this.stock > 0;
};

// Method to update stock
productSchema.methods.updateStock = async function (quantity) {
  this.stock += quantity;
  if (this.stock <= 0) {
    this.status = "out_of_stock";
  } else if (this.status === "out_of_stock") {
    this.status = "active";
  }
  return this.save();
};

// Pre-save middleware to update status based on stock
productSchema.pre("save", function (next) {
  if (this.stock <= 0 && this.status !== "inactive") {
    this.status = "out_of_stock";
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
