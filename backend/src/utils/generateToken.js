// ==========================================
// Import Packages - START
// ==========================================

import jwt from "jsonwebtoken";

// ==========================================
// Import Packages - END
// ==========================================

// ==========================================
// Generate JWT Token - START
// ==========================================

const generateToken = (userId, role) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ==========================================
// Generate JWT Token - END
// ==========================================

export default generateToken;