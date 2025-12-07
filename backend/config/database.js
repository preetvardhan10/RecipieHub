const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Helper function to check if a connection string is valid
    const isValidConnectionString = (uri) => {
      if (!uri || typeof uri !== 'string') return false;
      const trimmed = uri.trim();
      if (trimmed.length === 0) return false;
      if (!trimmed.startsWith('mongodb://') && !trimmed.startsWith('mongodb+srv://')) return false;
      // Check for placeholder values
      if (trimmed.includes('your-username') || trimmed.includes('your-password') || 
          trimmed.includes('<password>') || trimmed.includes('<username>') ||
          trimmed.includes('cluster.mongodb.net') && (trimmed.includes('your-') || trimmed.includes('<'))) {
        return false;
      }
      return true;
    };
    
    // Prioritize MONGO_URL (Railway default) if MONGODB_URI is invalid
    let mongoURI = null;
    
    // Check MONGO_URL first (Railway's default)
    if (process.env.MONGO_URL && isValidConnectionString(process.env.MONGO_URL)) {
      mongoURI = process.env.MONGO_URL.trim();
      console.log('Using MONGO_URL from Railway');
    }
    // Then check MONGODB_URI if MONGO_URL is not available
    else if (process.env.MONGODB_URI && isValidConnectionString(process.env.MONGODB_URI)) {
      mongoURI = process.env.MONGODB_URI.trim();
      console.log('Using MONGODB_URI');
    }
    // Fallback to localhost for development
    else {
      mongoURI = 'mongodb://localhost:27017/recipehub';
      if (process.env.NODE_ENV === 'production') {
        throw new Error('MONGODB_URI or MONGO_URL environment variable is required in production and must be a valid MongoDB connection string');
      }
      console.log('Using localhost MongoDB (development mode)');
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

