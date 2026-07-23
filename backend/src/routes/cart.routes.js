import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/:cartId", protect, updateCart);
router.delete("/:cartId", protect, removeFromCart);

export default router;

