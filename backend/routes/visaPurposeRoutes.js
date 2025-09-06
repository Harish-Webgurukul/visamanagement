const express = require('express');
const router = express.Router();
const { visaPurposeValidation } = require('../validators/visaPurposeValidator');
const visaPurposeController = require('../controllers/visaPurposeController');

router.post('/', visaPurposeValidation, visaPurposeController.createVisaPurpose);
router.get('/', visaPurposeController.getVisaPurposes);
router.get('/:id', visaPurposeController.getVisaPurpose);
router.put('/:id', visaPurposeValidation, visaPurposeController.updateVisaPurpose);
router.delete('/:id', visaPurposeController.deleteVisaPurpose);

module.exports = router;
