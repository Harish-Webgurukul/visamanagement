const { body } = require('express-validator');

exports.countryValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('iso2').optional().isLength({ min: 2, max: 2 }).withMessage('ISO2 must be 2 characters'),
  body('iso3').optional().isLength({ min: 3, max: 3 }).withMessage('ISO3 must be 3 characters'),
  body('flagUrl').optional().isURL().withMessage('Flag URL must be valid'),
  body('defaultCurrency').optional().isString().withMessage('Currency must be string'),
];
