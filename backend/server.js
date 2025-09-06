const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection file
const routes = require('./routes/index'); // Combined index routes
const swaggerRoutes = require('./swagger/index'); // Swagger documentation

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());               // Enable CORS
app.use(express.json());       // Parse JSON body

// Base API route
app.use('/api', routes);

// Swagger documentation route
app.use('/api-docs', swaggerRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).send('Visa Backend API is running 🚀');
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📖 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
