const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorHandler');
const { connectDB, disconnectDB } = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'http://localhost:5175'
    ].filter(Boolean);
    
    // In production, allow specified origins or any vercel.app origin
    // In development, allow all localhost origins
    if (process.env.NODE_ENV === 'production') {
      if (allowedOrigins.includes(origin) || origin?.includes('vercel.app')) {
        callback(null, true);
      } else {
        // Log for debugging but allow in production for now
        console.warn(`CORS: Origin ${origin} not in allowed list, but allowing for now`);
        callback(null, true);
      }
    } else {
      // Development: allow localhost origins
      if (origin.includes('localhost') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow in development for testing
      }
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/recipes', require('./routes/recipeRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/mealplans', require('./routes/mealPlanRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Root route - API information
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'RecipeHub API is running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      recipes: {
        list: 'GET /api/recipes',
        create: 'POST /api/recipes',
        get: 'GET /api/recipes/:id',
        update: 'PUT /api/recipes/:id',
        delete: 'DELETE /api/recipes/:id'
      },
      ai: {
        suggest: 'POST /api/ai/suggest'
      },
      mealplans: {
        list: 'GET /api/mealplans',
        create: 'POST /api/mealplans'
      }
    },
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'RecipeHub API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectDB();
  process.exit(0);
});

module.exports = app;

