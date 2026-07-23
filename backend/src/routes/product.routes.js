// ==========================================
// Import Packages - START
// ==========================================

import express from "express";
import { addProduct, addProductsFromJson, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import upload from "../middleware/upload.middleware.js";

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
// Product Routes - START
// ==========================================

// Add Product
router.post("/add", upload.array("images", 5), addProduct);

// Add Products From JSON (no file upload)
router.post("/add-json", addProductsFromJson);

// Get All Products
router.get("/", getAllProducts);

// Get Product By Id
router.get("/:id", getProductById);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

// ==========================================
// Product Routes - END
// ==========================================

export default router;