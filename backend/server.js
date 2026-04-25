require('dotenv').config(); // MUST BE LINE 1
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// --- 1. MIDDLEWARE ---
// Cors must come before routes to allow the frontend to connect
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// --- 2. DEBUGGING ---
console.log("---------------------------------");
console.log("System Initializing...");
console.log("Database URI Found:", process.env.MONGO_URI ? "YES" : "NO");
console.log("---------------------------------");

// --- 3. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("SUCCESS: MongoDB Connection Established"))
  .catch(err => {
    console.error("CRITICAL: Database Connection Failed!");
    console.error(err);
  });

// --- 4. ROUTE REGISTRATION ---

// Import Meeting Routes (Using the file in your routes folder)
const meetingRoutes = require("./routes/meetingRoutes");
app.use("/api/meetings", meetingRoutes);

// General API Routes (Inquiries, Portfolio, etc.)
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({ status: "Online", message: "API is Running" });
});

// --- 5. 404 ERROR HANDLING ---
app.use((req, res) => {
  console.log(`404 Warning: User tried to access ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found on this server.`
  });
});

// --- 6. GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error("SERVER_ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message
  });
});

// --- 7. SERVER INITIALIZATION ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`WORK_SERVER: Active on port ${PORT}`);
  console.log(`---------------------------------`);
  console.log(`READY: http://localhost:${PORT}/api/portfolio`);
  console.log(`READY: http://localhost:${PORT}/api/work`);
  console.log(`READY: http://localhost:${PORT}/api/projects`);
  console.log(`READY: http://localhost:${PORT}/api/meetings`);
  console.log(`---------------------------------`);
});