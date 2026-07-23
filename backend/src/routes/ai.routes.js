import express from "express";
import { stylistChat } from "../controllers/ai.controller.js";
import {aiRateLimiter} from "../middleware/aiRateLimiter.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/stylist", protect, aiRateLimiter, stylistChat);

export default router;