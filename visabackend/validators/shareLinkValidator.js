const { body } = require('express-validator');

exports.shareLinkValidation = [
  body('visaOption').notEmpty().isMongoId().withMessage('VisaOption ID is required'),
  body('token').notEmpty().withMessage('Token is required'),
  body('createdBy').optional().isMongoId(),
  body('expiresAt').optional().isISO8601().toDate(),
  body('isOneTime').optional().isBoolean(),
  body('clicks').optional().isInt({ min: 0 }),
  body('metadata').optional()
];
