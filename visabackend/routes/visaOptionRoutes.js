const express = require('express');
const router = express.Router();
const { visaOptionValidation } = require('../validators/visaOptionValidator');
const visaOptionController = require('../controllers/visaOptionController');

router.post('/', visaOptionValidation, visaOptionController.createVisaOption);
router.get('/', visaOptionController.getVisaOptions);
router.get('/:id', visaOptionController.getVisaOption);
router.put('/:id', visaOptionValidation, visaOptionController.updateVisaOption);
router.delete('/:id', visaOptionController.deleteVisaOption);

module.exports = router;
