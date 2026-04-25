const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
  },
  projectType: {
    type: String,
    required: true,
    enum: ["Web Development", "UI/UX Design", "Blockchain", "AI Solutions", "Cybersecurity", "Other"],
    default: "Web Development",
  },
  location: {
    type: String,
    required: [true, "Meeting location or link is required"],
    placeholder: "e.g., Google Meet, Zoom, or Physical Address",
  },
  meetingDate: {
    type: Date,
    required: [true, "Date and time is required"],
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Meeting", MeetingSchema);