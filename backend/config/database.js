const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check for MONGODB_URI first, then MONGO_URL (Railway default), then localhost
    let mongoURI = process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/recipehub';
    
    // Remove any whitespace and validate
    mongoURI = mongoURI.trim();
    
    // Validate connection string format
    if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
      // If it's a placeholder or invalid, try MONGO_URL instead
      if (process.env.MONGO_URL && process.env.MONGO_URL.trim().startsWith('mongodb')) {
        mongoURI = process.env.MONGO_URL.trim();
        console.log('Using MONGO_URL instead of invalid MONGODB_URI');
      } else {
        throw new Error(`Invalid MongoDB connection string. Must start with "mongodb://" or "mongodb+srv://". Got: ${mongoURI.substring(0, 50)}...`);
      }
    }
    
    // Check for placeholder values
    if (mongoURI.includes('your-username') || mongoURI.includes('your-password') || mongoURI.includes('<password>') || mongoURI.includes('<username>')) {
      // Try MONGO_URL if MONGODB_URI has placeholders
      if (process.env.MONGO_URL && process.env.MONGO_URL.trim().startsWith('mongodb')) {
        mongoURI = process.env.MONGO_URL.trim();
        console.log('MONGODB_URI contains placeholders, using MONGO_URL instead');
      } else {
        throw new Error('MongoDB connection string contains placeholder values. Please set a valid MONGODB_URI or MONGO_URL.');
      }
    }
    
    if ((!process.env.MONGODB_URI || mongoURI.includes('your-username')) && !process.env.MONGO_URL && process.env.NODE_ENV === 'production') {
      throw new Error('MONGODB_URI or MONGO_URL environment variable is required in production');
    }
    
    console.log(`Connecting to MongoDB...`);
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

