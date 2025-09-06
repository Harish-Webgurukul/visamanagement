const express = require('express');
const router = express.Router();
const { customerDocValidation } = require('../validators/customerDocValidator');
const customerDocController = require('../controllers/customerDocController');

router.post('/', customerDocValidation, customerDocController.createCustomerDoc);
router.get('/', customerDocController.getCustomerDocs);
router.get('/:id', customerDocController.getCustomerDoc);
router.put('/:id', customerDocValidation, customerDocController.updateCustomerDoc);
router.delete('/:id', customerDocController.deleteCustomerDoc);

module.exports = router;
