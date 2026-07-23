import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/place", protect, placeOrder);
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

// Admin routes
router.get("/all", protect, adminOnly, getAllOrders);
router.put("/status", protect, adminOnly, updateOrderStatus);

export default router;