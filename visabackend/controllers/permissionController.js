
const Permission = require('../models/Permission');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc ➕ Create a new permission
 * @route POST /api/permissions
 */
exports.createPermission = asyncHandler(async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, description } = req.body;

  // Check for duplicate name
  const existingPermission = await Permission.findOne({ name: name.trim() });
  if (existingPermission) {
    return res.status(400).json({ success: false, message: 'Permission with this name already exists' });
  }

  const permission = await Permission.create({
    name: name.trim(),
    description: description?.trim() || ''
  });

  return successResponse(res, 'Permission created successfully', permission, 201);
});

/**
 * @desc 📃 Get all permissions
 * @route GET /api/permissions
 */
exports.getAllPermissions = asyncHandler(async (req, res) => {
  const permissions = await Permission.find().sort({ createdAt: -1 });
  return successResponse(res, 'Permissions fetched successfully', permissions);
});

/**
 * @desc 📄 Get a single permission by ID
 * @route GET /api/permissions/:id
 */
exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching permission', error: error.message });
  }
};

/**
 * @desc ✏️ Update a permission
 * @route PUT /api/permissions/:id
 */
exports.updatePermission = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, description } = req.body;
  const { id } = req.params;

  // Check if permission exists
  const permission = await Permission.findById(id);
  if (!permission) {
    return res.status(404).json({ success: false, message: 'Permission not found' });
  }

  // Prevent duplicate names
  if (name && name.trim() !== permission.name) {
    const duplicate = await Permission.findOne({ name: name.trim(), _id: { $ne: id } });
    if (duplicate) {
      return res.status(400).json({ success: false, message: 'Another permission with this name already exists' });
    }
    permission.name = name.trim();
  }

  // Update description
  if (description) {
    permission.description = description.trim();
  }

  await permission.save();

  return successResponse(res, 'Permission updated successfully', permission);
});

/**
 * @desc ❌ Delete a permission
 * @route DELETE /api/permissions/:id
 */
exports.deletePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const permission = await Permission.findById(id);
  if (!permission) {
    return res.status(404).json({ success: false, message: 'Permission not found' });
  }

  await permission.deleteOne();

  return successResponse(res, 'Permission deleted successfully');
});
