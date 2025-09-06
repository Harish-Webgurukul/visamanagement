const VisaOption = require('../models/VisaOption');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create VisaOption
exports.createVisaOption = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const visaOption = await VisaOption.create(req.body);
  return successResponse(res, 'VisaOption created successfully', visaOption);
});

// 📃 Get All VisaOptions
exports.getVisaOptions = asyncHandler(async (req, res) => {
  const visaOptions = await VisaOption.find()
    .populate('country', 'name')
    .populate('purpose', 'title')
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email');
  return successResponse(res, 'VisaOptions fetched successfully', visaOptions);
});

// 📄 Get One VisaOption
exports.getVisaOption = asyncHandler(async (req, res) => {
  const visaOption = await VisaOption.findById(req.params.id)
    .populate('country', 'name')
    .populate('purpose', 'title')
    .populate('createdBy', 'name email')
    .populate('updatedBy', 'name email');
  if (!visaOption) return res.status(404).json({ success: false, message: 'VisaOption not found' });
  return successResponse(res, 'VisaOption fetched successfully', visaOption);
});

// ✏️ Update VisaOption
exports.updateVisaOption = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const visaOption = await VisaOption.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!visaOption) return res.status(404).json({ success: false, message: 'VisaOption not found' });
  return successResponse(res, 'VisaOption updated successfully', visaOption);
});

// ❌ Delete VisaOption
exports.deleteVisaOption = asyncHandler(async (req, res) => {
  const visaOption = await VisaOption.findByIdAndDelete(req.params.id);
  if (!visaOption) return res.status(404).json({ success: false, message: 'VisaOption not found' });
  return successResponse(res, 'VisaOption deleted successfully');
});
