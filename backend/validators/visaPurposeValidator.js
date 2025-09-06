const { body } = require('express-validator');

exports.visaPurposeValidation = [
  body('key').notEmpty().withMessage('Key is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().isString(),
  body('isActive').optional().isBoolean()
];
