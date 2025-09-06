const { body } = require('express-validator');

exports.customerDocValidation = [
  body('enquiry').isMongoId().withMessage('Enquiry must be a valid ID'),
  body('uploadedBy').isMongoId().withMessage('UploadedBy must be a valid User ID'),
  body('fileUrl').notEmpty().withMessage('File URL is required').isURL().withMessage('File URL must be valid'),
  body('fileType').notEmpty().withMessage('File type is required'),
  body('docCode').optional().isString(),
  body('isVerified').optional().isBoolean(),
  body('verifiedBy').optional().isMongoId(),
  body('sensitive').optional().isBoolean(),
];
