const express = require('express');
const router = express.Router();

// Import all routes
router.use('/permission', require('./permissionRoutes'));
router.use('/role', require('./roleRoutes'));
router.use('/user', require('./userRoutes'));
router.use('/country', require('./countryRoutes'));
router.use('/visapurpose', require('./visapurposeRoutes'));
router.use('/visaoption', require('./visaoptionRoutes'));
router.use('/document', require('./documentRoutes'));
router.use('/enquiry', require('./enquiryRoutes'));
router.use('/followup', require('./followupRoutes'));
router.use('/customerdoc', require('./customerdocRoutes'));
router.use('/sharelink', require('./sharelinkRoutes'));
router.use('/notification', require('./notificationRoutes'));
router.use('/auditlog', require('./auditlogRoutes'));

module.exports = router;
