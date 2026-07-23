import express from "express";

import {
  toggleWishlist,
  getWishlist,
  getWishlistCount,
} from "../controllers/wishlist.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/toggle", protect, toggleWishlist);

router.get("/", protect, getWishlist);

router.get("/count", protect, getWishlistCount);

export default router;