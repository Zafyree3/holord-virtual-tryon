// // services/cdnUploader.js
// const cloudinary = require("cloudinary").v2;
// const path = require("path");

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// });

// async function uploadToCDN(filePath) {
//   const result = await cloudinary.uploader.upload(filePath, { folder: "holord" });
//   return result.secure_url;
// }

// module.exports = { uploadToCDN };


// services/cdnUploader.js - USE LOCAL FILE SERVING
const path = require("path");
const fs = require("fs");

async function uploadToCDN(filePath) {
  try {
    console.log("📤 Serving image locally instead of Cloudinary...");
    
    // For development, serve files locally through Express
    const filename = path.basename(filePath);
    
    // Return the local URL that your Express server can serve
    return `http://localhost:5000/uploads/${filename}`;
    
  } catch (error) {
    console.error("❌ CDN upload error:", error.message);
    throw error;
  }
}

module.exports = { uploadToCDN };