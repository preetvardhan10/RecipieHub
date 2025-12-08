const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Health check (before DB connection for faster response)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Recipe Hub API is running!' });
});

// Connect to PostgreSQL, sync models, then start server
connectDB().then(async (sequelize) => {
  // Import models after connection
  const models = require('./models');
  
  // Sync database (create tables if they don't exist)
  // In production, use migrations instead of sync
  if (process.env.NODE_ENV !== 'production') {
    await sequelize.sync({ alter: true });
    console.log('Database models synced');
  } else {
    // In production, just authenticate - don't auto-sync
    console.log('Production mode: skipping auto-sync');
  }
  
  // Routes (loaded after models are initialized)
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/recipes', require('./routes/recipes'));
  app.use('/api/mealplans', require('./routes/mealplans'));
  app.use('/api/ai', require('./routes/ai'));
  app.use('/api/users', require('./routes/users'));
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
