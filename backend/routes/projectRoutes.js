const express = require('express');
const router = express.Router();
const { createProject, getProjects } = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth'); // For JWT authentication

// Create a new project and update inventory
router.post('/create', authMiddleware, createProject);

// Get all projects
router.get('/', authMiddleware, getProjects);

module.exports = router;
