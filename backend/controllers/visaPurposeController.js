const VisaPurpose = require('../models/VisaPurpose');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create VisaPurpose
exports.createVisaPurpose = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const visaPurpose = await VisaPurpose.create(req.body);
  return successResponse(res, 'VisaPurpose created successfully', visaPurpose);
});

// 📃 Get All VisaPurposes
exports.getVisaPurposes = asyncHandler(async (req, res) => {
  const visaPurposes = await VisaPurpose.find();
  return successResponse(res, 'VisaPurposes fetched successfully', visaPurposes);
});

// 📄 Get One VisaPurpose
exports.getVisaPurpose = asyncHandler(async (req, res) => {
  const visaPurpose = await VisaPurpose.findById(req.params.id);
  if (!visaPurpose) return res.status(404).json({ success: false, message: 'VisaPurpose not found' });
  return successResponse(res, 'VisaPurpose fetched successfully', visaPurpose);
});

// ✏️ Update VisaPurpose
exports.updateVisaPurpose = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const visaPurpose = await VisaPurpose.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!visaPurpose) return res.status(404).json({ success: false, message: 'VisaPurpose not found' });
  return successResponse(res, 'VisaPurpose updated successfully', visaPurpose);
});

// ❌ Delete VisaPurpose
exports.deleteVisaPurpose = asyncHandler(async (req, res) => {
  const visaPurpose = await VisaPurpose.findByIdAndDelete(req.params.id);
  if (!visaPurpose) return res.status(404).json({ success: false, message: 'VisaPurpose not found' });
  return successResponse(res, 'VisaPurpose deleted successfully');
});
