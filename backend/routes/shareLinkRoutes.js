const express = require('express');
const router = express.Router();
const { shareLinkValidation } = require('../validators/shareLinkValidator');
const shareLinkController = require('../controllers/shareLinkController');

router.post('/', shareLinkValidation, shareLinkController.createShareLink);
router.get('/', shareLinkController.getShareLinks);
router.get('/:id', shareLinkController.getShareLink);
router.put('/:id', shareLinkValidation, shareLinkController.updateShareLink);
router.delete('/:id', shareLinkController.deleteShareLink);

module.exports = router;
