const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toContact: {
    email: String,
    mobile: String
  },
  type: { type: String, enum: ['inapp','email','whatsapp','sms'], required: true },
  channelRef: String,
  title: String,
  body: String,
  status: { type: String, enum: ['queued','sent','failed'], default: 'queued' },
  relatedModel: {
    kind: String,
    item: { type: mongoose.Schema.Types.ObjectId }
  }
}, { timestamps: true });

notificationSchema.index({ 'toContact.email': 1, 'toContact.mobile': 1 });

module.exports = mongoose.model('Notification', notificationSchema);
