const Permission = require('../models/Permission');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create
exports.createPermission = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const permission = await Permission.create(req.body);
  return successResponse(res, 'Permission created successfully', permission);
});

// 📃 Read All
exports.getAllPermissions = asyncHandler(async (req, res) => {
  const permissions = await Permission.find();
  return successResponse(res, 'Permissions fetched successfully', permissions);
});

// 📄 Read One
exports.getPermissionById = asyncHandler(async (req, res) => {
  const permission = await Permission.findById(req.params.id);
  if (!permission) return res.status(404).json({ success: false, message: 'Permission not found' });
  return successResponse(res, 'Permission fetched successfully', permission);
});

// ✏️ Update
exports.updatePermission = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const permission = await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!permission) return res.status(404).json({ success: false, message: 'Permission not found' });
  return successResponse(res, 'Permission updated successfully', permission);
});

// ❌ Delete
exports.deletePermission = asyncHandler(async (req, res) => {
  const permission = await Permission.findByIdAndDelete(req.params.id);
  if (!permission) return res.status(404).json({ success: false, message: 'Permission not found' });
  return successResponse(res, 'Permission deleted successfully');
});
