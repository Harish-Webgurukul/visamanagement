const express = require('express');
const router = express.Router();
const { followupValidation } = require('../validators/followupValidator');
const followupController = require('../controllers/followupController');

router.post('/', followupValidation, followupController.createFollowup);
router.get('/', followupController.getFollowups);
router.get('/:id', followupController.getFollowup);
router.put('/:id', followupValidation, followupController.updateFollowup);
router.delete('/:id', followupController.deleteFollowup);

module.exports = router;
