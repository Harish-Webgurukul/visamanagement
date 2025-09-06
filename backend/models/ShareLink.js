const mongoose = require('mongoose');

const shareLinkSchema = new mongoose.Schema({
  visaOption: { type: mongoose.Schema.Types.ObjectId, ref: 'VisaOption', required: true },
  token: { type: String, required: true, unique: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expiresAt: Date,
  isOneTime: { type: Boolean, default: false },
  clicks: { type: Number, default: 0 },
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

shareLinkSchema.index({ token: 1 });

module.exports = mongoose.model('ShareLink', shareLinkSchema);
