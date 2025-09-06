const mongoose = require('mongoose');

const feeItemSchema = new mongoose.Schema({
  title: { type: String },
  adultPrice: { type: Number, default: null },
  childPrice: { type: Number, default: null },
  serviceFee: { type: Number, default: null },
  additionalCharges: [{ label: String, price: Number }],
  currency: { type: String, default: 'USD' }
}, { _id: false });

const docRequirementSchema = new mongoose.Schema({
  title: String,
  code: String,
  required: { type: Boolean, default: true },
  providedBy: { type: String, enum: ['guest','consultant','both'], default: 'guest' },
  type: { type: String, enum: ['edoc','physical','both'], default: 'edoc' },
  notes: String,
  attachedTemplate: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' }
}, { _id: true });

const visaOptionSchema = new mongoose.Schema({
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true, index: true },
  purpose: { type: mongoose.Schema.Types.ObjectId, ref: 'VisaPurpose', required: true, index: true },
  title: { type: String, required: true },
  editorHtml: { type: String },
  fees: [feeItemSchema],
  documentRequirements: [docRequirementSchema],
  addOnNotes: String,
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  version: { type: Number, default: 1 },
  searchableText: { type: String }
}, { timestamps: true });

visaOptionSchema.index({ title: 'text', editorHtml: 'text', searchableText: 'text' });

module.exports = mongoose.model('VisaOption', visaOptionSchema);
