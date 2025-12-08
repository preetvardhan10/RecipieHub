const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// Load environment variables before creating Prisma Client
dotenv.config();

// Create Prisma Client - it will validate DATABASE_URL when connecting, not on instantiation
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

module.exports = prisma;

