
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const Document = require("../models/Document");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");
const { cloudinary } = require("../config/multer");

// ------------------------------
// Helper Functions
// ------------------------------

// Delete old document from Cloudinary
const deleteOldDoc = async (fileName) => {
  if (!fileName) return;
  const publicId = `documents/${fileName.split(".")[0]}`;
  await cloudinary.uploader.destroy(publicId);
};

// Upload file to Cloudinary
const uploadToCloudinary = async (filePath, folder) => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  return result.secure_url;
};
exports.createDocument = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { country, purpose, name, tags, notes, isTemplate } = req.body;

  // ✅ Only check for these fields
  if (!country || !purpose || !name) {
    return res.status(400).json({
      success: false,
      message: "Country, Purpose, and Name are mandatory",
    });
  }

  let uploadedFiles = [];

  // ✅ Handle multiple files from multer
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const cloudUrl = await uploadToCloudinary(file.path, "documents");

      // Extract only file name from Cloudinary URL
      const fileName = path.basename(cloudUrl);

      uploadedFiles.push(fileName);
    }
  }

  // ✅ Ensure at least one file is uploaded
  if (uploadedFiles.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one document file must be uploaded",
    });
  }

  // ✅ Handle tags gracefully
  let parsedTags = [];
  if (tags) {
    try {
      parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);
    } catch (err) {
      // If it's plain text, wrap it in an array
      parsedTags = [tags];
    }
  }

  const document = await Document.create({
    country,
    purpose,
    name,
    requiredDocuments: uploadedFiles, // final list of file names
    tags: parsedTags,
    notes,
    isTemplate: isTemplate || false,
    uploadedBy: req.user ? req.user._id : null,
  });

  return successResponse(res, "Document created successfully", document);
});


// ------------------------------
// Get All Documents
// ------------------------------
exports.getDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find()
    .populate("country", "name")
    .populate("purpose", "name")
    .populate("uploadedBy", "name email");

  const updatedDocs = documents.map((doc) => ({
    ...doc._doc,
    requiredDocuments: doc.requiredDocuments.map((file) => ({
      cloud: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/documents/${file}`,
      local: `http://localhost:5000/uploads/documents/${file}`,
      fileName: file,
    })),
  }));

  return successResponse(res, "Documents fetched successfully", updatedDocs);
});

// ------------------------------
// Get Single Document
// ------------------------------
exports.getDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id)
    .populate("country", "name")
    .populate("purpose", "name")
    .populate("uploadedBy", "name email");

  if (!document) {
    return res.status(404).json({ success: false, message: "Document not found" });
  }

  const updatedDoc = {
    ...document._doc,
    requiredDocuments: document.requiredDocuments.map((file) => ({
      cloud: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/documents/${file}`,
      local: `http://localhost:5000/uploads/documents/${file}`,
      fileName: file,
    })),
  };

  return successResponse(res, "Document fetched successfully", updatedDoc);
});

// ------------------------------
// Update Document
// ------------------------------
exports.updateDocument = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { country, purpose, name, requiredDocuments, tags, notes, isTemplate } = req.body;

  const document = await Document.findById(req.params.id);
  if (!document) {
    return res.status(404).json({ success: false, message: "Document not found" });
  }

  // Handle new files
  if (req.files && req.files.length > 0) {
    // Delete old files from Cloudinary
    for (const oldFile of document.requiredDocuments) {
      await deleteOldDoc(oldFile);
    }

    let newFiles = [];
    for (const file of req.files) {
      const cloudUrl = await uploadToCloudinary(file.path, "documents");
      const fileName = path.basename(cloudUrl);
      newFiles.push(fileName);
    }
    document.requiredDocuments = newFiles;
  }

  // Update other fields
  document.country = country || document.country;
  document.purpose = purpose || document.purpose;
  document.name = name || document.name;
  document.tags = tags ? JSON.parse(tags) : document.tags;
  document.notes = notes || document.notes;
  document.isTemplate = isTemplate !== undefined ? isTemplate : document.isTemplate;

  await document.save();
  return successResponse(res, "Document updated successfully", document);
});

// ------------------------------
// Delete Document
// ------------------------------
exports.deleteDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);
  if (!document) {
    return res.status(404).json({ success: false, message: "Document not found" });
  }

  // Delete all files from Cloudinary
  for (const file of document.requiredDocuments) {
    await deleteOldDoc(file);
  }

  await document.deleteOne();
  return successResponse(res, "Document deleted successfully");
});
