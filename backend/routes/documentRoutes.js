const express = require('express');
const router = express.Router();
const { documentValidation } = require('../validators/documentValidator');
const documentController = require('../controllers/documentController');

router.post('/', documentValidation, documentController.createDocument);
router.get('/', documentController.getDocuments);
router.get('/:id', documentController.getDocument);
router.put('/:id', documentValidation, documentController.updateDocument);
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
