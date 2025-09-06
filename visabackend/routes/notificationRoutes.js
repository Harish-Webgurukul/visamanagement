const express = require('express');
const router = express.Router();
const { notificationValidation } = require('../validators/notificationValidator');
const notificationController = require('../controllers/notificationController');

router.post('/', notificationValidation, notificationController.createNotification);
router.get('/', notificationController.getNotifications);
router.get('/:id', notificationController.getNotification);
router.put('/:id', notificationValidation, notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
