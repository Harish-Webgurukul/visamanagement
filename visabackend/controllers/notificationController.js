const Notification = require('../models/Notification');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create
exports.createNotification = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const notification = await Notification.create(req.body);
  return successResponse(res, 'Notification created successfully', notification);
});

// 📃 Read All
exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find().populate('toUser', 'name email');
  return successResponse(res, 'Notifications fetched successfully', notifications);
});

// 📄 Read One
exports.getNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id).populate('toUser', 'name email');
  if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
  return successResponse(res, 'Notification fetched successfully', notification);
});

// ✏️ Update
exports.updateNotification = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
  return successResponse(res, 'Notification updated successfully', notification);
});

// ❌ Delete
exports.deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);
  if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
  return successResponse(res, 'Notification deleted successfully');
});
