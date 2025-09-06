const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, index: true },
  mobile: { type: String, index: true },
  source: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
  purpose: { type: mongoose.Schema.Types.ObjectId, ref: 'VisaPurpose' },
  travelDates: {
    from: Date,
    to: Date
  },
  adults: { type: Number, default: 1 },
  children: { type: Number, default: 0 },
  selectedVisaOption: { type: mongoose.Schema.Types.ObjectId, ref: 'VisaOption' },
  status: { type: String, enum: ['new','contacted','inprogress','closed','lost'], default: 'new' },
  notes: String,
  contactHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Followup' }],
  isGuest: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

enquirySchema.index({ email: 1 });
enquirySchema.index({ mobile: 1 });
enquirySchema.index({ 'travelDates.from': 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
