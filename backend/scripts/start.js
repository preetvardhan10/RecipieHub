const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('🚀 Starting RecipeHub Backend...');
    
    // Run migrations
    console.log('📦 Running database migrations...');
    try {
      execSync('npx prisma migrate deploy', { stdio: 'inherit' });
      console.log('✅ Migrations applied successfully');
    } catch (error) {
      console.log('⚠️  Migrations may have already been applied or failed:', error.message);
    }

    // Check if database needs seeding
    console.log('🌱 Checking if database needs seeding...');
    try {
      const userCount = await prisma.user.count();
      
      if (userCount === 0) {
        console.log('🌱 Database is empty, seeding with sample data...');
        execSync('npm run seed', { stdio: 'inherit' });
        console.log('✅ Database seeded successfully');
      } else {
        console.log(`✅ Database already has ${userCount} users, skipping seed`);
      }
    } catch (error) {
      console.log('⚠️  Seed check failed, attempting to seed anyway...');
      try {
        execSync('npm run seed', { stdio: 'inherit' });
      } catch (seedError) {
        console.log('⚠️  Seed failed (data may already exist):', seedError.message);
      }
    }
  } catch (error) {
    console.error('❌ Database setup error:', error.message);
    // Don't exit - let server start anyway
  } finally {
    await prisma.$disconnect();
  }
}

// Run setup, then start server
setupDatabase().then(() => {
  console.log('🚀 Starting server...');
  require('../server.js');
}).catch((error) => {
  console.error('❌ Failed to setup database:', error);
  console.log('🚀 Starting server anyway...');
  require('../server.js');
});

