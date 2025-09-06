const { body } = require('express-validator');

exports.documentValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().isString(),
  body('fileUrl').optional().isURL().withMessage('File URL must be valid'),
  body('fileType').optional().isString(),
  body('size').optional().isNumeric(),
  body('uploadedBy').optional().isMongoId().withMessage('UploadedBy must be a valid User ID'),
  body('tags').optional().isArray(),
  body('isTemplate').optional().isBoolean(),
];
