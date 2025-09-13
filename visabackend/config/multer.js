const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// --------------------
// Cloudinary Config
// --------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --------------------
// Ensure local folders exist
// --------------------
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
ensureDir("uploads/profileImages");
ensureDir("uploads/documents");

// --------------------
// Local storage for profile images
// --------------------
const localProfileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/profileImages"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname.split(".")[0]}${ext}`);
  },
});

// --------------------
// Local storage for documents
// --------------------
const localDocumentStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/documents"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname.split(".")[0]}${ext}`);
  },
});

// --------------------
// Multer instances
// --------------------
const uploadLocalProfile = multer({ storage: localProfileStorage });
const uploadLocalDocument = multer({ storage: localDocumentStorage });

// --------------------
// Export
// --------------------
module.exports = {
  cloudinary,
  uploadLocalProfile,
  uploadLocalDocument
};






//only cloudinary storage is used now

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;
// require("dotenv").config();

// // --------------------
// // Cloudinary Config
// // --------------------
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // --------------------
// // Cloudinary storage for profile images
// // --------------------
// const profileImageStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "profileImages",
//     allowed_formats: ["jpeg", "jpg", "png"],
//     public_id: (req, file) =>
//       `${Date.now()}-${file.originalname.split(".")[0]}`, // Unique name
//   },
// });

// // --------------------
// // Cloudinary storage for documents
// // --------------------
// const documentStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "documents",
//     allowed_formats: ["jpeg", "jpg", "png", "pdf"],
//     public_id: (req, file) =>
//       `${Date.now()}-${file.originalname.split(".")[0]}`, // Unique name
//   },
// });

// // --------------------
// // Multer instances
// // --------------------
// const uploadProfileImage = multer({ storage: profileImageStorage });
// const uploadDocument = multer({ storage: documentStorage });

// // --------------------
// // Export both
// // --------------------
// module.exports = {
//   cloudinary,
//   uploadProfileImage,
//   uploadDocument,
// };



//profile image storage both local and cloudinary
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;
// require("dotenv").config();

// // ✅ Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ✅ Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "profileImages", // Folder name in Cloudinary
//     allowed_formats: ["jpeg", "jpg", "png"],
//     public_id: (req, file) =>
//       `${Date.now()}-${file.originalname.split(".")[0]}`, // Unique name
//   },
// });

// // ✅ Multer instance
// const upload = multer({ storage });

// // ✅ Export both
// module.exports = {
//   upload,
//   cloudinary,
// };
