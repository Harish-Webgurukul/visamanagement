// const mongoose = require('mongoose');

// const countrySchema = new mongoose.Schema({
//   name: { type: String, required: true, index: true },
//   iso2: { type: String, index: true },
//   iso3: String,
//   flagUrl: String,
//   defaultCurrency: String,
//   meta: mongoose.Schema.Types.Mixed
// }, { timestamps: true });

// countrySchema.index({ name: 'text' });

// module.exports = mongoose.model('Country', countrySchema);


const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true, 
      index: true 
    },

    iso2: {
      type: String,
      uppercase: true, // save as uppercase if provided
      trim: true,
      minlength: 2,
      maxlength: 2,
      default: null    // optional, can be null
    },

    iso3: {
      type: String,
      uppercase: true, 
      trim: true,
      minlength: 3,
      maxlength: 3,
      default: null    // optional, can be null
    },

    flagUrl: {
      type: String,
      default: null,
      trim: true
    },

    defaultCurrency: {
      type: String,
      required: true,
      trim: true
    },

    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

// Full-text search index on name
countrySchema.index({ name: 'text' });

module.exports = mongoose.model('Country', countrySchema);
