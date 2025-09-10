const express = require('express');
const router = express.Router();
const { userValidation } = require('../validators/userValidator');
const userController = require('../controllers/userController');
const upload = require("../config/multer");

// POST /api/user
router.post('/', upload.single('profileImage'), userValidation(false), userController.createUser);
router.put('/:id', upload.single('profileImage'), userValidation(true), userController.updateUser);
router.post('/', userValidation, userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userValidation, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
