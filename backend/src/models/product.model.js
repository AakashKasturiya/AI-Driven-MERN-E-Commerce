// ==========================================
// Import Packages - START
// ==========================================

import mongoose from "mongoose";

// ==========================================
// Import Packages - END
// ==========================================

// ==========================================
// Product Schema - START
// ==========================================

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  shortDescription: {
    type: String,
    default: "",
  },

  category: {
    type: String,
    required: true,
  },

  subCategory: {
    type: String,
    default: "",
  },

  brand: {
    type: String,
    required: true,
  },

  sku: {
    type: String,
    unique: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discountPrice: {
    type: Number,
    default: 0,
  },

  discountPercentage: {
    type: Number,
    default: 0,
  },

  stock: {
    type: Number,
    required: true,
    default: 0,
  },

  thumbnail: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number],
    default: [],
    select: false, // don't return this huge array in normal product queries/API responses
  },
  embeddingUpdatedAt: {
    type: Date,
    default: null,
  },

  images: [{
    type: String,
  }, ],
}, {
  timestamps: true,
});

// ==========================================
// Product Schema - END
// ==========================================

// ==========================================
// Product Model - START
// ==========================================

const Product = mongoose.model("Product", productSchema);

// ==========================================
// Product Model - END
// ==========================================

export default Product;