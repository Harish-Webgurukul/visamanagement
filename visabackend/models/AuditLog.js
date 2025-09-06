const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ip: String,
  userAgent: String,
  target: { kind: String, item: mongoose.Schema.Types.ObjectId },
  before: mongoose.Schema.Types.Mixed,
  after: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
