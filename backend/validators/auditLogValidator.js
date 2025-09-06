const { body } = require("express-validator");

exports.auditLogValidation = [
  body("action").notEmpty().withMessage("Action is required"),
  body("performedBy").isMongoId().withMessage("PerformedBy must be a valid User ID"),
  body("ip").notEmpty().withMessage("IP is required"),
  body("userAgent").notEmpty().withMessage("User Agent is required"),
  body("target.kind").notEmpty().withMessage("Target kind is required"),
  body("target.item").isMongoId().withMessage("Target item must be a valid ID"),
];
