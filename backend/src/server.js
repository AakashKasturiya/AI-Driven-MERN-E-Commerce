// ==========================================
// Import Packages - START
// ==========================================
import "./config/env.js";
import app from "./app.js";
import connectDB from "./config/database.js";
import { seedAdminUser } from "./utils/seedAdmin.js";

// ==========================================
// Import Packages - END
// ==========================================

// ==========================================
// Database Connection - START
// ==========================================

await connectDB();
await seedAdminUser();

// ==========================================
// Database Connection - END
// ==========================================

// ==========================================
// Start Server - START
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// ==========================================
// Start Server - END
// ==========================================