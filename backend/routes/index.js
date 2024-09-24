const express = require('express');
const authRoutes = require('./authRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const projectRoutes = require('./projectRoutes');

const router = express.Router();

// Register route files
router.use('/auth', authRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
