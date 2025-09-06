const Role = require('../models/Role');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create
exports.createRole = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const role = await Role.create(req.body);
  return successResponse(res, 'Role created successfully', role);
});

// 📃 Read All
exports.getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find()
    .populate('permissions', 'key name')
    .populate('inherits', 'name');
  return successResponse(res, 'Roles fetched successfully', roles);
});

// 📄 Read One
exports.getRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id)
    .populate('permissions', 'key name')
    .populate('inherits', 'name');
  if (!role) return res.status(404).json({ success: false, message: 'Role not found' });
  return successResponse(res, 'Role fetched successfully', role);
});

// ✏️ Update
exports.updateRole = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!role) return res.status(404).json({ success: false, message: 'Role not found' });
  return successResponse(res, 'Role updated successfully', role);
});

// ❌ Delete
exports.deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findByIdAndDelete(req.params.id);
  if (!role) return res.status(404).json({ success: false, message: 'Role not found' });
  return successResponse(res, 'Role deleted successfully');
});
