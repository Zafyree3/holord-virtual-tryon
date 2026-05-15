// // services/qrCodeGenerator.js
// const QRCode = require("qrcode");

// async function generateQRCode(url) {
//   const qrDataUrl = await QRCode.toDataURL(url);
//   return qrDataUrl;
// }

// module.exports = { generateQRCode };


// services/qrCodeGenerator.js - SIMPLE VERSION
async function generateQRCode(url) {
  // Return a simple placeholder for now
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjY0IiB5PSI2NCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNmI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5RUiBDb2RlPC90ZXh0Pjwvc3ZnPg==";
}

module.exports = { generateQRCode };