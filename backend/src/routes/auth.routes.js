// ==========================================
// Import Packages - START
// ==========================================

import express from "express";
import { signupUser, loginUser } from "../controllers/auth.controller.js";

// ==========================================
// Import Packages - END
// ==========================================

// ==========================================
// Create Router - START
// ==========================================

const router = express.Router();

// ==========================================
// Create Router - END
// ==========================================

// ==========================================
// Authentication Routes - START
// ==========================================

// Register User
router.post("/signup", signupUser);

// Login User
router.post("/login", loginUser);

// ==========================================
// Authentication Routes - END
// ==========================================

export default router;