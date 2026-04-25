const express = require('express');
const router = express.Router();
// --- MODEL IMPORTS ---
const Post = require('../models/Post');
const Inquiry = require('../models/Inquiry');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Admin = require('../models/Admin');
const Blog = require('../models/Blog');
const Meeting = require('../models/Meeting');

// --- 1. DASHBOARD OVERVIEW STATS ---
router.get('/dashboard-stats', async (req, res) => {
    try {
        const [services, projects, inquiries] = await Promise.all([
            Service.countDocuments(),
            Project.countDocuments(),
            Inquiry.countDocuments()
        ]);
        res.json({ services, projects, inquiries });
    } catch (err) {
        res.status(500).json({ message: "Error fetching statistics" });
    }
});

// --- 2. AUTHENTICATION (Bypassed) ---
// --- 2. AUTHENTICATION (TOTAL BYPASS) ---
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // DO NOT ask the database for Admin.findOne
        // Just check the hardcoded strings
        if (email.toLowerCase() === 'admin@test.com' && password === '123') {
            return res.json({
                success: true,
                token: "bypassed_token_9921",
                message: "Access Granted"
            });
        } else {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    } catch (err) {
        // This will now only run if your code has a syntax error
        res.status(500).json({ success: false, message: "System Error" });
    }
});
// --- 3. SERVICE MANAGEMENT ---
router.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch services" });
    }
});

router.post('/services', async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(500).json({ message: "Failed to create service", error: err.message });
    }
});

router.put('/services/:id', async (req, res) => {
    try {
        const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});

router.delete('/services/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
});

// --- 4. PORTFOLIO / WORK / PROJECTS ---

// GET: Fetch all projects
router.get(['/portfolio', '/work', '/projects'], async (req, res) => {
    try {
        const projects = await Project.find().sort({ year: -1 });
        res.status(200).json(projects);
    } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Failed to fetch portfolio" });
    }
});

// POST: Create a new project
router.post(['/portfolio', '/work', '/projects'], async (req, res) => {
    try {
        // Validation: Ensure body isn't empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data received by server" });
        }

        const newProject = new Project({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            year: req.body.year || "2026"
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        console.error("POST_ERROR:", err.message);
        res.status(500).json({
            message: "Database Save Failed",
            error: err.message
        });
    }
});

// DELETE: Remove a project
router.delete(['/portfolio/:id', '/work/:id', '/projects/:id'], async (req, res) => {
    try {
        const result = await Project.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Project not found in database" });
        }
        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        console.error("DELETE_ERROR:", err.message);
        res.status(500).json({ message: "Delete failed" });
    }
});

// --- 6. MEETINGS & INQUIRIES ---

// POST: Create a new inquiry (THIS WAS MISSING)
// Matches: https://devhub-portfolio-gtu4.vercel.app/api/inquiry
router.post('/inquiry', async (req, res) => {
    try {
        const { name, email, message, projectType } = req.body;
        const newInquiry = new Inquiry({
            name,
            email,
            message,
            projectType: projectType || "General",
            createdAt: new Date()
        });
        await newInquiry.save();
        res.status(201).json({ success: true, message: "Transmission_Successful" });
    } catch (err) {
        console.error("Inquiry_Post_Error:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET: Fetch all inquiries for Admin Dashboard
// Matches: https://devhub-portfolio-gtu4.vercel.app/api/inquiries
router.get('/inquiries', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ success: false, message: "Fetch failed" });
    }
});

// DELETE: Remove an inquiry by ID
// Matches: https://devhub-portfolio-gtu4.vercel.app/api/inquiries/:id
router.delete('/inquiries/:id', async (req, res) => {
    try {
        const result = await Inquiry.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        res.json({ success: true, message: "Inquiry deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error during deletion" });
    }
});
// --- POSTS / BLOG SYSTEM ---

// GET all posts for the Main Page
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// POST a new post from Admin Dashboard
router.post('/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: "Failed to create post", error: err.message });
    }
});

// DELETE a post
router.delete('/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
});
module.exports = router;