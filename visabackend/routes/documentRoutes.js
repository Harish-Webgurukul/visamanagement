const express = require("express");
const router = express.Router();
const { documentValidation } = require("../validators/documentValidator");
const { uploadLocalDocument } = require("../config/multer"); // dual storage
const documentController = require("../controllers/documentController");

// ✅ Create Document with multiple files
router.post(
  "/",
  uploadLocalDocument.array("requiredDocuments", 10), // allow up to 10 files
  documentValidation,
  documentController.createDocument
);

// ✅ Get All Documents
router.get("/", documentController.getDocuments);

// ✅ Get One Document
router.get("/:id", documentController.getDocument);

// ✅ Update Document (can upload new files)
router.put(
  "/:id",
  uploadLocalDocument.array("requiredDocuments", 10),
  documentValidation,
  documentController.updateDocument
);

// ✅ Delete Document
router.delete("/:id", documentController.deleteDocument);

module.exports = router;
