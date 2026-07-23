// ==========================================
// Import Packages - START
// ==========================================

import express from "express";
import cors from "cors";

import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import orderRoutes from "./routes/order.routes.js";

import userRoutes from "./routes/user.routes.js";

import aiRoutes from "./routes/ai.routes.js";


// ==========================================
// Import Packages - END
// ==========================================

// ==========================================
// Create Express App - START
// ==========================================

const app = express();

// ==========================================
// Create Express App - END
// ==========================================

// ==========================================
// Global Middleware - START
// ==========================================

// Parse JSON request body
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-driven-mern-e-commerce.vercel.app",
];

// Enable CORS
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Add Security Headers
app.use(helmet());

// Log API Requests
app.use(morgan("dev"));

// ==========================================
// Global Middleware - END
// ==========================================

// ==========================================
// Test Route - START
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 AI Driven Ecommerce Backend is Running...",
  });
});

// ==========================================
// Test Route - END
// ==========================================

// ==========================================
// Authentication Routes - START
// ==========================================

app.use("/api/auth", authRoutes);

// ==========================================
// Authentication Routes - END
// ==========================================

// Product Routes
app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/users", userRoutes);

app.use("/api/ai", aiRoutes);

export default app;