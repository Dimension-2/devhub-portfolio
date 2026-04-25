const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");

// @route   POST /api/meetings
// @desc    Create a new meeting request (Client Side)
router.post("/", async (req, res) => {
  try {
    const newMeeting = new Meeting(req.body);
    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET /api/meetings
// @desc    Get all meeting requests (Admin Dashboard)
router.get("/", async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ meetingDate: 1 });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   DELETE /api/meetings/:id
// @desc    Delete a meeting request (Admin Dashboard)
router.delete("/:id", async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    res.json({ message: "Meeting purged from database." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;