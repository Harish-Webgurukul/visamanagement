const Document = require('../models/Document');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create
exports.createDocument = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const doc = await Document.create(req.body);
  return successResponse(res, 'Document created successfully', doc);
});

// 📃 Read All
exports.getDocuments = asyncHandler(async (req, res) => {
  const docs = await Document.find().populate('uploadedBy', 'name email');
  return successResponse(res, 'Documents fetched successfully', docs);
});

// 📄 Read One
exports.getDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findById(req.params.id).populate('uploadedBy', 'name email');
  if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
  return successResponse(res, 'Document fetched successfully', doc);
});

// ✏️ Update
exports.updateDocument = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const doc = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
  return successResponse(res, 'Document updated successfully', doc);
});

// ❌ Delete
exports.deleteDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
  return successResponse(res, 'Document deleted successfully');
});
