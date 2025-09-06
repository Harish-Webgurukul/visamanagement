const mongoose = require('mongoose');

const customerDocSchema = new mongoose.Schema({
  enquiry: { type: mongoose.Schema.Types.ObjectId, ref: 'Enquiry' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String,
  fileType: String,
  docCode: String,
  isVerified: { type: Boolean, default: false },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deletedAt: Date,
  sensitive: { type: Boolean, default: false },
  meta: mongoose.Schema.Types.Mixed
}, { timestamps: true });

customerDocSchema.index({ enquiry: 1, uploadedBy: 1 });

module.exports = mongoose.model('CustomerDoc', customerDocSchema);
