// ==========================================
// Import Packages - START
// ==========================================

import mongoose from "mongoose";

// ==========================================
// Import Packages - END
// ==========================================

// ==========================================
// Wishlist Schema - START
// ==========================================



const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate wishlist items
wishlistSchema.index(
  {
    user: 1,
    product: 1,
  },
  {
    unique: true,
  }
);

// ==========================================
// Wishlist Schema - END
// ==========================================

// ==========================================
// Wishlist Model - START
// ==========================================

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// ==========================================
// Wishlist Model - END
// ==========================================

export default Wishlist;