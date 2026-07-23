import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createUser);

router.get("/", protect, adminOnly, getAllUsers);

router.get("/:id", protect, adminOnly, getUserById);

router.put("/:id", protect, adminOnly, updateUser);

router.delete("/:id", protect, adminOnly, deleteUser);

export default router;