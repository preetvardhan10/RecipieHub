const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check for MONGODB_URI first, then MONGO_URL (Railway default), then localhost
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/recipehub';
    
    if (!process.env.MONGODB_URI && !process.env.MONGO_URL && process.env.NODE_ENV === 'production') {
      throw new Error('MONGODB_URI or MONGO_URL environment variable is required in production');
    }
    
    // Remove deprecated options - they're not needed in mongoose 6+
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full error:', error);
    throw error;
  }
};

module.exports = connectDB;

