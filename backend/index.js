const express = require('express');
const cors = require('cors');
const connectDB = require('./config/config'); // MongoDB connection
const errorHandler = require('./middleware/errorHandler'); // Global error handler
require('dotenv').config(); // Load environment variables

const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventory');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/projects', projectRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Default Route
app.get('/', (req, res) => {
  res.send('Warehouse Management API is running...');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
