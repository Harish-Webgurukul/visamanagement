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

