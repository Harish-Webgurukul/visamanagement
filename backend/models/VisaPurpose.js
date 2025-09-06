const mongoose = require('mongoose');

const visaPurposeSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('VisaPurpose', visaPurposeSchema);
