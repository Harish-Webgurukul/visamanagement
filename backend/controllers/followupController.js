const Followup = require('../models/Followup');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create
exports.createFollowup = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const followup = await Followup.create(req.body);
  return successResponse(res, 'Followup created successfully', followup);
});

// 📃 Read All
exports.getFollowups = asyncHandler(async (req, res) => {
  const followups = await Followup.find()
    .populate('enquiry', 'customerName email mobile')
    .populate('createdBy', 'name email')
    .populate('attachedDocs', 'name fileUrl');
  return successResponse(res, 'Followups fetched successfully', followups);
});

// 📄 Read One
exports.getFollowup = asyncHandler(async (req, res) => {
  const followup = await Followup.findById(req.params.id)
    .populate('enquiry', 'customerName email mobile')
    .populate('createdBy', 'name email')
    .populate('attachedDocs', 'name fileUrl');
  if (!followup) return res.status(404).json({ success: false, message: 'Followup not found' });
  return successResponse(res, 'Followup fetched successfully', followup);
});

// ✏️ Update
exports.updateFollowup = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const followup = await Followup.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!followup) return res.status(404).json({ success: false, message: 'Followup not found' });
  return successResponse(res, 'Followup updated successfully', followup);
});

// ❌ Delete
exports.deleteFollowup = asyncHandler(async (req, res) => {
  const followup = await Followup.findByIdAndDelete(req.params.id);
  if (!followup) return res.status(404).json({ success: false, message: 'Followup not found' });
  return successResponse(res, 'Followup deleted successfully');
});
