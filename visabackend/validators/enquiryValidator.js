const { body } = require('express-validator');

exports.enquiryValidation = [
  body('customerName').notEmpty().withMessage('Customer name is required'),
  body('email').optional().isEmail().withMessage('Email must be valid'),
  body('mobile').optional().isString(),
  body('source').optional().isString(),
  body('assignedTo').optional().isMongoId(),
  body('country').optional().isMongoId(),
  body('purpose').optional().isMongoId(),
  body('travelDates.from').optional().isISO8601().toDate(),
  body('travelDates.to').optional().isISO8601().toDate(),
  body('adults').optional().isInt({ min: 0 }),
  body('children').optional().isInt({ min: 0 }),
  body('selectedVisaOption').optional().isMongoId(),
  body('status').optional().isIn(['new','contacted','inprogress','closed','lost']),
  body('notes').optional().isString(),
  body('contactHistory').optional().isArray(),
  body('isGuest').optional().isBoolean(),
  body('createdBy').optional().isMongoId(),
];
