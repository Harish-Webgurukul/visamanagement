const express = require('express');
const router = express.Router();
const { countryValidation } = require('../validators/countryValidator');
const countryController = require('../controllers/countryController');

router.post('/', countryValidation, countryController.createCountry);
router.get('/', countryController.getCountries);
router.get('/:id', countryController.getCountry);
router.put('/:id', countryValidation, countryController.updateCountry);
router.delete('/:id', countryController.deleteCountry);

module.exports = router;
