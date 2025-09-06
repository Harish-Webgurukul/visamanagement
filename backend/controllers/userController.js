const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create User
exports.createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { password, ...rest } = req.body;
  if (password) {
    rest.passwordHash = await bcrypt.hash(password, 10);
  }

  const user = await User.create(rest);
  return successResponse(res, 'User created successfully', user);
});

// 📃 Get All Users
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate('roles', 'name').populate('createdBy', 'name email');
  return successResponse(res, 'Users fetched successfully', users);
});

// 📄 Get One User
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('roles', 'name').populate('createdBy', 'name email');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  return successResponse(res, 'User fetched successfully', user);
});

// ✏️ Update User
exports.updateUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { password, ...rest } = req.body;
  if (password) {
    rest.passwordHash = await bcrypt.hash(password, 10);
  }

  const user = await User.findByIdAndUpdate(req.params.id, rest, { new: true, runValidators: true });
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  return successResponse(res, 'User updated successfully', user);
});

// ❌ Delete User
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  return successResponse(res, 'User deleted successfully');
});
