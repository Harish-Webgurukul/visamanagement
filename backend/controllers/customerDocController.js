const CustomerDoc = require('../models/CustomerDoc');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create
exports.createCustomerDoc = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const doc = await CustomerDoc.create(req.body);
  return successResponse(res, 'Customer document created successfully', doc);
});

// 📃 Read All
exports.getCustomerDocs = asyncHandler(async (req, res) => {
  const docs = await CustomerDoc.find()
    .populate('enquiry', 'title') // assuming Enquiry has title
    .populate('uploadedBy', 'name email')
    .populate('verifiedBy', 'name email');
  return successResponse(res, 'Customer documents fetched successfully', docs);
});

// 📄 Read One
exports.getCustomerDoc = asyncHandler(async (req, res) => {
  const doc = await CustomerDoc.findById(req.params.id)
    .populate('enquiry', 'title')
    .populate('uploadedBy', 'name email')
    .populate('verifiedBy', 'name email');
  if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
  return successResponse(res, 'Customer document fetched successfully', doc);
});

// ✏️ Update
exports.updateCustomerDoc = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const doc = await CustomerDoc.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
  return successResponse(res, 'Customer document updated successfully', doc);
});

// ❌ Delete
exports.deleteCustomerDoc = asyncHandler(async (req, res) => {
  const doc = await CustomerDoc.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
  return successResponse(res, 'Customer document deleted successfully');
});
