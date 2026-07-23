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

// ==========================================
// CORS Configuration
// ==========================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-driven-mern-e-commerce.vercel.app",
  "https://ai-driven-mern-e-commerce-git-main-aakash-kasturiya-s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // Example: Postman, mobile apps, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked origin:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ==========================================
// Security & Logging
// ==========================================

app.use(helmet());

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
// API Routes - START
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/users", userRoutes);

app.use("/api/ai", aiRoutes);

// ==========================================
// API Routes - END
// ==========================================

export default app;