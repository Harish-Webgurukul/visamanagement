const Country = require('../models/Country');
const { validationResult } = require('express-validator');
const { successResponse } = require('../utils/response');
const asyncHandler = require('../utils/asyncHandler');

// ➕ Create
exports.createCountry = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const country = await Country.create(req.body);
  return successResponse(res, 'Country created successfully', country);
});

// 📃 Read All
exports.getCountries = asyncHandler(async (req, res) => {
  const countries = await Country.find();
  return successResponse(res, 'Countries fetched successfully', countries);
});

// 📄 Read One
exports.getCountry = asyncHandler(async (req, res) => {
  const country = await Country.findById(req.params.id);
  if (!country) return res.status(404).json({ success: false, message: 'Country not found' });
  return successResponse(res, 'Country fetched successfully', country);
});

// ✏️ Update
exports.updateCountry = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!country) return res.status(404).json({ success: false, message: 'Country not found' });
  return successResponse(res, 'Country updated successfully', country);
});

// ❌ Delete
exports.deleteCountry = asyncHandler(async (req, res) => {
  const country = await Country.findByIdAndDelete(req.params.id);
  if (!country) return res.status(404).json({ success: false, message: 'Country not found' });
  return successResponse(res, 'Country deleted successfully');
});
