const { body } = require('express-validator');

exports.visaOptionValidation = [
  body('country').notEmpty().isMongoId().withMessage('Country ID is required'),
  body('purpose').notEmpty().isMongoId().withMessage('VisaPurpose ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('editorHtml').optional().isString(),
  body('fees').optional().isArray(),
  body('fees.*.title').optional().isString(),
  body('fees.*.adultPrice').optional().isNumeric(),
  body('fees.*.childPrice').optional().isNumeric(),
  body('fees.*.serviceFee').optional().isNumeric(),
  body('fees.*.additionalCharges').optional().isArray(),
  body('documentRequirements').optional().isArray(),
  body('documentRequirements.*.title').optional().isString(),
  body('documentRequirements.*.code').optional().isString(),
  body('documentRequirements.*.required').optional().isBoolean(),
  body('documentRequirements.*.providedBy').optional().isIn(['guest','consultant','both']),
  body('documentRequirements.*.type').optional().isIn(['edoc','physical','both']),
  body('attachments').optional().isArray(),
  body('isActive').optional().isBoolean(),
  body('createdBy').optional().isMongoId(),
  body('updatedBy').optional().isMongoId(),
  body('version').optional().isNumeric(),
  body('searchableText').optional().isString(),
  body('addOnNotes').optional().isString()
];
