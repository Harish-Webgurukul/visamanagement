const express = require('express');
const router = express.Router();
const { permissionValidation } = require('../validators/permissionValidator');
const permissionController = require('../controllers/permissionController');

router.post('/', permissionValidation, permissionController.createPermission);
router.get('/', permissionController.getAllPermissions);        // updated
router.get('/:id', permissionController.getPermissionById);     // updated
router.put('/:id', permissionValidation, permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);

module.exports = router;
