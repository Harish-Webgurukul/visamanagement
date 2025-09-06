const Enquiry = require('../models/Enquiry');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create
exports.createEnquiry = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const enquiry = await Enquiry.create(req.body);
  return successResponse(res, 'Enquiry created successfully', enquiry);
});

// 📃 Read All
exports.getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find()
    .populate('assignedTo', 'name email')
    .populate('country', 'name')
    .populate('purpose', 'name')
    .populate('selectedVisaOption', 'name')
    .populate('contactHistory', 'notes');
  return successResponse(res, 'Enquiries fetched successfully', enquiries);
});

// 📄 Read One
exports.getEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id)
    .populate('assignedTo', 'name email')
    .populate('country', 'name')
    .populate('purpose', 'name')
    .populate('selectedVisaOption', 'name')
    .populate('contactHistory', 'notes');
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  return successResponse(res, 'Enquiry fetched successfully', enquiry);
});

// ✏️ Update
exports.updateEnquiry = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  return successResponse(res, 'Enquiry updated successfully', enquiry);
});

// ❌ Delete
exports.deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  return successResponse(res, 'Enquiry deleted successfully');
});
