/**
 * Main server file for Password Reset MERN Application
 * Updated for Render Deployment
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
// Update: CORS ko restricted rakha hai taaki sirf aapka frontend access kar sake
app.use(cors({
    origin: process.env.FRONTEND_URL || "*", // Production mein yahan frontend ka link aayega
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
// Update: Modern Mongoose mein options ki zaroorat nahi hoti
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✓ MongoDB connected successfully'))
.catch((err) => {
    console.error('✗ MongoDB connection error:', err.message);
    process.exit(1); // Agar DB connect na ho to server band kar do
});

// Routes
app.use('/api/auth', authRoutes);

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString() 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error Stack:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});
