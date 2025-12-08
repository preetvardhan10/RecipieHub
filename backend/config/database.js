const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const path = require('path');

// Ensure .env is loaded before creating Prisma Client
dotenv.config({ path: path.join(__dirname, '../.env') });

// Check for DATABASE_URL - provide helpful error if missing
if (!process.env.DATABASE_URL) {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
  if (isProduction) {
    console.error('❌ DATABASE_URL is not set in Railway environment variables');
    console.error('📝 To fix this in Railway:');
    console.error('   1. Go to Railway Dashboard → Your Service');
    console.error('   2. Click "Variables" tab');
    console.error('   3. Click "New Variable"');
    console.error('   4. Name: DATABASE_URL');
    console.error('   5. Value: your-postgresql-connection-string');
    console.error('   6. Railway will automatically redeploy');
  } else {
    console.error('❌ DATABASE_URL is not set in .env file');
    console.error('📝 Please add DATABASE_URL to your .env file:');
    console.error('   DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require');
    console.error('');
    console.error('💡 If you have MONGODB_URI in your .env, please replace it with DATABASE_URL');
    console.error('   Example (Neon DB): DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/db?sslmode=require');
  }
}

// Create Prisma Client instance
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

const connectDB = async () => {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set. Please add it to your .env file.');
    }
    
    await prisma.$connect();
    console.log('✅ PostgreSQL Connected via Prisma');
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error.message);
    
    if (error.message.includes('DATABASE_URL')) {
      const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
      console.error('');
      if (isProduction) {
        console.error('📝 To fix this in Railway:');
        console.error('   1. Go to Railway Dashboard → Your Service');
        console.error('   2. Click "Variables" tab');
        console.error('   3. Click "New Variable"');
        console.error('   4. Name: DATABASE_URL');
        console.error('   5. Value: postgresql://neondb_owner:npg_4D5wEuaSWObU@ep-snowy-hall-ahjaamyt-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require');
        console.error('   6. Railway will automatically redeploy');
      } else {
        console.error('📝 To fix this:');
        console.error('   1. Open backend/.env file');
        console.error('   2. Add: DATABASE_URL=your-postgresql-connection-string');
        console.error('   3. If you see MONGODB_URI, replace it with DATABASE_URL');
      }
      console.error('');
    }
    
    // Don't exit in development - allow server to start for testing other parts
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.warn('⚠️  Server will continue but database operations will fail until DATABASE_URL is set.');
    }
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

module.exports = { prisma, connectDB, disconnectDB };

