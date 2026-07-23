// ==========================================
// Import Packages - START
// ==========================================

import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// ==========================================
// Import Packages - END
// ==========================================

// ==========================================
// Cloudinary Config - START
// ==========================================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// ==========================================
// Cloudinary Config - END
// ==========================================

// ==========================================
// Upload Image Function - START
// ==========================================

export const uploadToCloudinary = (fileBuffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// ==========================================
// Upload Image Function - END
// ==========================================

export default cloudinary;