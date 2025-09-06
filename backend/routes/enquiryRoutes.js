const express = require('express');
const router = express.Router();
const { enquiryValidation } = require('../validators/enquiryValidator');
const enquiryController = require('../controllers/enquiryController');

router.post('/', enquiryValidation, enquiryController.createEnquiry);
router.get('/', enquiryController.getEnquiries);
router.get('/:id', enquiryController.getEnquiry);
router.put('/:id', enquiryValidation, enquiryController.updateEnquiry);
router.delete('/:id', enquiryController.deleteEnquiry);

module.exports = router;
