const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  iso2: { type: String, index: true },
  iso3: String,
  flagUrl: String,
  defaultCurrency: String,
  meta: mongoose.Schema.Types.Mixed
}, { timestamps: true });

countrySchema.index({ name: 'text' });

module.exports = mongoose.model('Country', countrySchema);
