const { body } = require('express-validator');

exports.roleValidation = [
  body('name').notEmpty().withMessage('Role name is required'),
  body('description').optional().isString(),
  body('permissions').optional().isArray(),
  body('permissions.*').optional().isMongoId(),
  body('inherits').optional().isArray(),
  body('inherits.*').optional().isMongoId(),
  body('isSystem').optional().isBoolean()
];
