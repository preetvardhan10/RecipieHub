#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting RecipeHub Backend..."

# Run migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy || echo "⚠️  Migrations may have already been applied"

# Seed database (only if empty - check if users exist)
echo "🌱 Checking if database needs seeding..."
USER_COUNT=$(npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM \"User\";" 2>/dev/null | grep -o '[0-9]*' | head -1 || echo "0")

if [ "$USER_COUNT" = "0" ] || [ -z "$USER_COUNT" ]; then
  echo "🌱 Seeding database with sample data..."
  npm run seed || echo "⚠️  Seed may have failed or data already exists"
else
  echo "✅ Database already has data, skipping seed"
fi

# Start the server
echo "🚀 Starting server..."
exec node server.js

