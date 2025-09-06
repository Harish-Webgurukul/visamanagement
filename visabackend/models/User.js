const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  mobile: { type: String, index: true },
  passwordHash: { type: String },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  profileImage: { type: String },
  isActive: { type: Boolean, default: true },
  metadata: mongoose.Schema.Types.Mixed,
  customerProfile: {
    passportNo: String,
    dob: Date,
    address: String
  },
  lastLoginAt: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

userSchema.index({ email: 1 });
userSchema.index({ mobile: 1 });

module.exports = mongoose.model('User', userSchema);
