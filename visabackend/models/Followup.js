const mongoose = require('mongoose');

const followupSchema = new mongoose.Schema({
  enquiry: { type: mongoose.Schema.Types.ObjectId, ref: 'Enquiry', required: true, index: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['call','email','whatsapp','sms','automated_call','automated_whatsapp'], required: true },
  mediumMeta: mongoose.Schema.Types.Mixed,
  message: String,
  result: { type: String },
  nextFollowupAt: Date,
  remindersSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
  attachedDocs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
}, { timestamps: true });

followupSchema.index({ enquiry: 1, createdAt: -1 });

module.exports = mongoose.model('Followup', followupSchema);
