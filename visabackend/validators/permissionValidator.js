const { body } = require('express-validator');

exports.permissionValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
];
