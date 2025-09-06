const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. 'manager'
  description: { type: String },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
  inherits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  isSystem: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
