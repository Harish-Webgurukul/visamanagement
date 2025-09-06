const express = require('express');
const router = express.Router();
const { roleValidation } = require('../validators/roleValidator');
const roleController = require('../controllers/roleController');

router.post('/', roleValidation, roleController.createRole);
router.get('/', roleController.getRoles);
router.get('/:id', roleController.getRole);
router.put('/:id', roleValidation, roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
