
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const { successResponse } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");
const { cloudinary } = require("../config/multer");

// Delete old profile image from Cloudinary
const deleteOldImage = async (fileName) => {
  if (!fileName) return;
  const publicId = `profileImages/${fileName.split(".")[0]}`;
  await cloudinary.uploader.destroy(publicId);
};

// Upload file to Cloudinary
const uploadToCloudinary = async (filePath, folder) => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  return result.secure_url;
};

// // Create User
exports.createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { password, passportNo, dob, address, roles, email, ...rest } = req.body;

  // Check duplicate email
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ success: false, error: "Email already exists!" });
  if (!password) return res.status(400).json({ success: false, error: "Password is required!" });

  rest.passwordHash = await bcrypt.hash(password, 10);

  // Handle profile image (local + Cloudinary)
  if (req.file) {
  const cloudUrl = await uploadToCloudinary(req.file.path, "profileImages");
  rest.profileImage = cloudUrl;          // required field
  rest.profileImageLocal = req.file.path;
  rest.profileImageCloud = cloudUrl;
}

  // Parse roles safely
  try {
    rest.roles = roles ? JSON.parse(roles) : [];
  } catch (err) {
    return res.status(400).json({ success: false, error: "Invalid roles format!" });
  }

  rest.customerProfile = { passportNo, dob, address };

  const user = await User.create({ email, ...rest });

  return successResponse(res, "User created successfully", user);
});



// Get All Users
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .populate("roles", "name")
    .populate("createdBy", "name email");

  const updatedUsers = users.map(user => ({
    ...user._doc,
    profileImageCloud: user.profileImageCloud || null,
    profileImageLocal: user.profileImageLocal
      ? `http://localhost:5000/${user.profileImageLocal.replace(/\\/g, "/")}`
      : null, // replace backslashes for Windows paths
  }));

  return successResponse(res, "Users fetched successfully", updatedUsers);
});

// Get Single User
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("roles", "name")
    .populate("createdBy", "name email");

  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  const updatedUser = {
    ...user._doc,
    profileImageCloud: user.profileImageCloud || null,
    profileImageLocal: user.profileImageLocal
      ? `http://localhost:5000/${user.profileImageLocal.replace(/\\/g, "/")}`
      : null,
  };

  return successResponse(res, "User fetched successfully", updatedUser);
});

// Update User
exports.updateUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { password, passportNo, dob, address, roles, email, ...rest } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  // Check email change
  if (email && email !== user.email) {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, error: "Email already exists!" });
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
    if (user.profileImageCloud) await deleteOldImage(user.profileImageCloud);
    user.profileImageLocal = req.file.path;
    user.profileImageCloud = await uploadToCloudinary(req.file.path, "profileImages");
  }

  // Update other fields
  Object.keys(rest).forEach(key => {
    user[key] = rest[key];
  });

  await user.save();
  return successResponse(res, "User updated successfully", user);
});

// Delete User
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  if (user.profileImageCloud) await deleteOldImage(user.profileImageCloud);

  await user.deleteOne();
  return successResponse(res, "User deleted successfully");
});
