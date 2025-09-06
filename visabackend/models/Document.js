const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
    purpose: { type: mongoose.Schema.Types.ObjectId, ref: "VisaPurpose", required: true },
    name: { type: String, required: true },
    requiredDocuments: [{ type: String, required: true }],
    tags: {
      type: [String], // ✅ Proper array of strings
      default: []
    },
    notes: { type: String },
    isTemplate: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// ✅ Correct text index
DocumentSchema.index({ name: "text", tags: "text" });

module.exports = mongoose.model("Document", DocumentSchema);


// const mongoose = require('mongoose');

// const documentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String,
//   fileUrl: String,
//   fileType: String,
//   size: Number,
//   uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   tags: [String],
//   isTemplate: { type: Boolean, default: false },
//   meta: mongoose.Schema.Types.Mixed
// }, { timestamps: true });

// documentSchema.index({ name: 'text', tags: 1 });

// module.exports = mongoose.model('Document', documentSchema);
