// ==========================================
// Import Models - START
// ==========================================

import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

// ==========================================
// Import Models - END
// ==========================================

// ==========================================
// Dashboard Stats - START
// ==========================================

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalRevenue = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const lowStockProducts = await Product.find({
      stock: {
        $lte: 10,
      },
    });

    return res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.revenue || 0,
      },

      latestProducts,

      lowStockProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Dashboard Stats - END
// ==========================================