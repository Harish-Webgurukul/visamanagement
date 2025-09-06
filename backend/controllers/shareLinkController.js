const ShareLink = require('../models/ShareLink');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create
exports.createShareLink = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const shareLink = await ShareLink.create(req.body);
  return successResponse(res, 'ShareLink created successfully', shareLink);
});

// 📃 Read All
exports.getShareLinks = asyncHandler(async (req, res) => {
  const shareLinks = await ShareLink.find()
    .populate('visaOption', 'name')
    .populate('createdBy', 'name email');
  return successResponse(res, 'ShareLinks fetched successfully', shareLinks);
});

// 📄 Read One
exports.getShareLink = asyncHandler(async (req, res) => {
  const shareLink = await ShareLink.findById(req.params.id)
    .populate('visaOption', 'name')
    .populate('createdBy', 'name email');
  if (!shareLink) return res.status(404).json({ success: false, message: 'ShareLink not found' });
  return successResponse(res, 'ShareLink fetched successfully', shareLink);
});

// ✏️ Update
exports.updateShareLink = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const shareLink = await ShareLink.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!shareLink) return res.status(404).json({ success: false, message: 'ShareLink not found' });
  return successResponse(res, 'ShareLink updated successfully', shareLink);
});

// ❌ Delete
exports.deleteShareLink = asyncHandler(async (req, res) => {
  const shareLink = await ShareLink.findByIdAndDelete(req.params.id);
  if (!shareLink) return res.status(404).json({ success: false, message: 'ShareLink not found' });
  return successResponse(res, 'ShareLink deleted successfully');
});
