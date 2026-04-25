const mongoose = require('mongoose');

// Service Schema
const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Briefcase' }
});

// Portfolio Schema
const PortfolioSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  link: { type: String }
});

// Inquiry Schema
const InquirySchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

// Blog Schema
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  publishedAt: { type: Date, default: Date.now }
});

// Meeting Schema
const MeetingSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  topic: { type: String },
  status: { type: String, default: 'Scheduled' }
});

module.exports = {
  Blog: mongoose.model('Blog', BlogSchema),
  Meeting: mongoose.model('Meeting', MeetingSchema)
};


module.exports = {
  Service: mongoose.model('Service', ServiceSchema),
  Portfolio: mongoose.model('Portfolio', PortfolioSchema),
  Inquiry: mongoose.model('Inquiry', InquirySchema)
};