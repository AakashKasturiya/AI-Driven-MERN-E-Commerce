// ==========================================
// Import Packages - START
// ==========================================

import mongoose from "mongoose";

// ==========================================
// Import Packages - END
// ==========================================

// ==========================================
// Database Connection - START
// ==========================================

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);

    process.exit(1);
  }
};

// ==========================================
// Database Connection - END
// ==========================================

export default connectDB;