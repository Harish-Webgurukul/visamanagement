const { body } = require('express-validator');

exports.followupValidation = [
  body('enquiry').isMongoId().withMessage('Enquiry must be a valid ID'),
  body('createdBy').optional().isMongoId(),
  body('type').notEmpty().isIn(['call','email','whatsapp','sms','automated_call','automated_whatsapp']),
  body('mediumMeta').optional(),
  body('message').optional().isString(),
  body('result').optional().isString(),
  body('nextFollowupAt').optional().isISO8601().toDate(),
  body('remindersSent').optional().isArray(),
  body('attachedDocs').optional().isArray(),
];
