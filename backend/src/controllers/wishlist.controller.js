// ==========================================
// Import Packages - START
// ==========================================

import Wishlist from "../models/wishlist.model.js";

// ==========================================
// Import Packages - END
// ==========================================

// ==========================================
// Toggle Wishlist - START
// ==========================================

export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const existingWishlist = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    // Remove From Wishlist
    if (existingWishlist) {
      await Wishlist.findByIdAndDelete(existingWishlist._id);

      return res.status(200).json({
        success: true,
        message: "Removed from wishlist",
        wishlisted: false,
      });
    }

    // Add To Wishlist
    await Wishlist.create({
      user: userId,
      product: productId,
    });

    return res.status(201).json({
      success: true,
      message: "Added to wishlist",
      wishlisted: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Toggle Wishlist - END
// ==========================================


// ==========================================
// Get Wishlist - START
// ==========================================

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;

    const wishlist = await Wishlist.find({
      user: userId,
    }).populate("product");

    return res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Wishlist - END
// ==========================================


// ==========================================
// Get Wishlist Count - START
// ==========================================

export const getWishlistCount = async (req, res) => {
  try {
    const userId = req.user.userId;

    const count = await Wishlist.countDocuments({
      user: userId,
    });

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Wishlist Count - END
// ==========================================