const AuditLog = require("../models/AuditLog");
const { validationResult } = require("express-validator");
const { successResponse } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");

// ➕ Create
exports.createAuditLog = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const auditLog = await AuditLog.create(req.body);
  return successResponse(res, "Audit log created successfully", auditLog);
});

// 📃 Read All
exports.getAuditLogs = asyncHandler(async (req, res) => {
  const logs = await AuditLog.find().populate("performedBy", "name email");
  return successResponse(res, "Audit logs fetched successfully", logs);
});

// 📄 Read One
exports.getAuditLog = asyncHandler(async (req, res) => {
  const log = await AuditLog.findById(req.params.id).populate(
    "performedBy",
    "name email"
  );
  if (!log)
    return res.status(404).json({ success: false, message: "Log not found" });
  return successResponse(res, "Audit log fetched successfully", log);
});

// ✏️ Update
exports.updateAuditLog = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const log = await AuditLog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!log)
    return res.status(404).json({ success: false, message: "Log not found" });
  return successResponse(res, "Audit log updated successfully", log);
});

// ❌ Delete
exports.deleteAuditLog = asyncHandler(async (req, res) => {
  const log = await AuditLog.findByIdAndDelete(req.params.id);
  if (!log)
    return res.status(404).json({ success: false, message: "Log not found" });
  return successResponse(res, "Audit log deleted successfully");
});
