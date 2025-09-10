const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

/** Delete old profile image */
const deleteOldImage = (imagePath) => {
  if (!imagePath) return;
  const filePath = path.join(__dirname, '..', imagePath);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// ➕ Create User
exports.createUser = asyncHandler(async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { password, passportNo, dob, address, roles, email, ...rest } = req.body;

  // Check duplicate email
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ success: false, error: 'Email already exists!' });

  // Hash password
  if (!password) return res.status(400).json({ success: false, error: 'Password is required!' });
  rest.passwordHash = await bcrypt.hash(password, 10);

  // Profile image
  if (req.file) rest.profileImage = `/uploads/profileImages/${req.file.filename}`;

  rest.roles = roles ? JSON.parse(roles) : [];
  rest.customerProfile = { passportNo, dob, address };

  const user = await User.create({ email, ...rest });
  return successResponse(res, 'User created successfully', user);
});

// 📄 Get All Users
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .populate('roles', 'name')
    .populate('createdBy', 'name email');
  return successResponse(res, 'Users fetched successfully', users);
});

// 📄 Get One User
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('roles', 'name')
    .populate('createdBy', 'name email');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  return successResponse(res, 'User fetched successfully', user);
});

// ✏️ Update User
exports.updateUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { password, passportNo, dob, address, roles, email, ...rest } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  // Check if email is changing to another user's email
  if (email && email !== user.email) {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, error: 'Email already exists!' });
    user.email = email;
  }

  // Hash new password if provided
  if (password) user.passwordHash = await bcrypt.hash(password, 10);

  // Update customer profile
  user.customerProfile = { passportNo, dob, address };

  // Update roles
  if (roles) user.roles = JSON.parse(roles);

  // Update profile image
  if (req.file) {
    if (user.profileImage) deleteOldImage(user.profileImage);
    user.profileImage = `/uploads/profileImages/${req.file.filename}`;
  }

  // Update other fields
  Object.keys(rest).forEach((key) => {
    user[key] = rest[key];
  });

  await user.save();
  return successResponse(res, 'User updated successfully', user);
});

// ❌ Delete User
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  if (user.profileImage) deleteOldImage(user.profileImage);
  await user.deleteOne();
  return successResponse(res, 'User deleted successfully');
});
