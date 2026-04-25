const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  projectType: { type: String, required: true },
  status: { type: String, default: "unread" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inquiry", InquirySchema);