// // routes/generate.js
// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const { callNanoBanana } = require("../services/nanobanana");
// const { uploadToCDN } = require("../services/cdnUploader");
// const { generateQRCode } = require("../services/qrCodeGenerator");

// const router = express.Router();

// // Multer setup for temporary uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage: storage });

// router.post("/", upload.single("photo"), async (req, res) => {
//   try {
//     console.log("📸 Received generate request");

//     if (!req.file) {
//       throw new Error("No photo file uploaded");
//     }

//     const clothingChoice = req.body.clothing;
//     const userPhotoPath = req.file.path;

//     console.log("Clothing choice:", clothingChoice);
//     console.log("User photo path:", userPhotoPath);

//     // 1️⃣ Call NanoBanana AI
//     console.log("🔄 Calling NanoBanana AI...");
//     const aiImagePath = await callNanoBanana(userPhotoPath, clothingChoice);
//     console.log("✅ AI image generated:", aiImagePath);

//     // 2️⃣ Upload AI result to CDN
//     console.log("🔄 Uploading to CDN...");
//     const cdnUrl = await uploadToCDN(aiImagePath);
//     console.log("✅ CDN URL:", cdnUrl);

//     // 3️⃣ Generate QR code
//     console.log("🔄 Generating QR code...");
//     const qrCodeDataUrl = await generateQRCode(cdnUrl);
//     console.log("✅ QR code generated");

//     console.log("🎉 Success! Returning response...");

//     // 4️⃣ Return response to frontend
//     res.json({
//       success: true,
//       resultImageUrl: cdnUrl,
//       qrCode: qrCodeDataUrl,
//       message: "Virtual try-on generated successfully!"
//     });

//   } catch (err) {
//     console.error("❌ Error in generate route:", err);
//     console.error("Error stack:", err.stack);
//     res.status(500).json({
//       success: false,
//       error: "Something went wrong",
//       details: err.message,
//       stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//     });
//   }
// });

// module.exports = router;
// routes/generate.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const { callNanoBanana } = require("../services/nanobanana");
const { uploadToCDN } = require("../services/cdnUploader");
const { generateQRCode } = require("../services/qrCodeGenerator");

const router = express.Router();

// Multer setup for temporary uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// routes/generate.js - Ensure this part is correct
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    console.log("📸 Received generate request");

    if (!req.file) {
      throw new Error("No photo file uploaded");
    }

    // Collect all clothing items
    const clothingItems = [];

    // Check for multiple clothing items (clothing_0, clothing_1)
    if (req.body.clothing_0) clothingItems.push(req.body.clothing_0);
    if (req.body.clothing_1) clothingItems.push(req.body.clothing_1);

    // If no multi items, check for single clothing
    if (clothingItems.length === 0 && req.body.clothing) {
      clothingItems.push(req.body.clothing);
    }

    if (clothingItems.length === 0) {
      throw new Error("No clothing items provided");
    }

    const userPhotoPath = req.file.path;
    console.log("User photo path:", userPhotoPath);
    console.log("Clothing items:", clothingItems);

    // Call NanoBanana with ALL clothing items
    console.log(
      `🔄 Calling NanoBanana AI with ${clothingItems.length} item(s)...`
    );
    const aiImagePath = await callNanoBanana(userPhotoPath, clothingItems);
    console.log("✅ AI image generated:", aiImagePath);

    // Upload to CDN
    console.log("🔄 Uploading to CDN...");
    const cdnUrl = await uploadToCDN(aiImagePath);
    console.log("✅ CDN URL:", cdnUrl);

    // Generate QR code
    console.log("🔄 Generating QR code...");
    const qrCodeDataUrl = await generateQRCode(cdnUrl);
    console.log("✅ QR code generated");

    res.json({
      success: true,
      resultImageUrl: cdnUrl,
      qrCode: qrCodeDataUrl,
      message: `Virtual try-on generated successfully with ${clothingItems.length} item(s)!`,
    });
  } catch (err) {
    console.error("❌ Error in generate route:", err);
    res.status(500).json({
      success: false,
      error: err.message,
      details: err.stack,
    });
  }
});

module.exports = router;
