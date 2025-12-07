#!/bin/bash
# Render CLI Deployment Script for RecipeHub Backend

echo "🚀 Deploying RecipeHub Backend to Render..."

# Step 1: Login (if not already logged in)
echo "Step 1: Logging in to Render..."
render login

# Step 2: Navigate to backend directory
cd backend

# Step 3: Create web service
echo "Step 2: Creating web service..."
render services create \
  --name recipehub-backend \
  --type web \
  --env node \
  --region oregon \
  --plan free \
  --build-command "npm install" \
  --start-command "npm start" \
  --root-dir . \
  --repo https://github.com/preetvardhan10/RecipieHub.git \
  --branch main

# Step 4: Set environment variables
echo "Step 3: Setting environment variables..."
echo "⚠️  You'll need to set these manually in Render Dashboard:"
echo "   NODE_ENV=production"
echo "   MONGODB_URI=your-mongodb-connection-string"
echo "   JWT_SECRET=your-secret-key"
echo "   FRONTEND_URL=http://localhost:3000"
echo "   OPENAI_API_KEY=your-openai-key (optional)"

echo ""
echo "✅ Service created! Go to Render Dashboard to set environment variables."
