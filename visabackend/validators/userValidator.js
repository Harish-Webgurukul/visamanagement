// const { body } = require('express-validator');

// exports.userValidation = [
//   body('name').notEmpty().withMessage('Name is required'),
//   body('email').isEmail().withMessage('Valid email is required'),
//   body('mobile').optional().isMobilePhone(),
//   body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
//   body('roles').optional().isArray(),
//   body('roles.*').optional().isMongoId(),
//   body('profileImage').optional().isString(),
//   body('isActive').optional().isBoolean(),
//   body('customerProfile').optional().custom(profile => {
//     if (profile) {
//       if (profile.dob && isNaN(Date.parse(profile.dob))) throw new Error('Invalid DOB');
//     }
//     return true;
//   }),
//   body('createdBy').optional().isMongoId()
// ];
const { body } = require('express-validator');

const userValidation = (isUpdate = false) => [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  
  // Password required only for create
  body('password')
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage('Password is required'),
  
  // Role required only for create
  body('roles')
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage('At least one role is required'),
];

module.exports = { userValidation };
