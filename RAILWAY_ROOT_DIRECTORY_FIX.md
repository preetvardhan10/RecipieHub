# Fix Railway Root Directory Issue

## The Problem
Your Railway service shows:
- Build command: `npm install` ✅
- Start command: `npm start` ✅

But the build is failing because Railway is looking in the **root directory** instead of the `backend` directory.

## Solution: Set Root Directory in Railway

### Step 1: Go to Railway Dashboard
1. Go to https://railway.app
2. Click on your project: `powerful-acceptance`
3. Click on your service: `recipehub-backend`

### Step 2: Open Settings
1. Click **"Settings"** tab (top navigation)
2. Scroll down to **"Service"** section

### Step 3: Set Root Directory
1. Find **"Root Directory"** field
2. Set it to: `backend`
3. Click **"Save"** or **"Update"**

### Step 4: Redeploy
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** button
3. Or Railway will auto-redeploy after you save settings

## Alternative: Update Start Command

If Root Directory setting doesn't work, try:

1. In **Settings** → **Deploy** section
2. Change **Start Command** from `npm start` to:
   ```
   cd backend && npm start
   ```
3. Or use absolute path:
   ```
   node backend/index.js
   ```

## What Should Happen After Fix

Build logs should show:
1. ✅ "Installing Node.js 18.x"
2. ✅ "Running: npm install" (in backend directory)
3. ✅ "Starting: npm start" or "node index.js"
4. ✅ "Server running on port..."

## Quick Checklist

- [ ] Root Directory set to: `backend`
- [ ] Build Command: `npm install` (or leave empty)
- [ ] Start Command: `npm start` (or `node index.js`)
- [ ] Environment variables added
- [ ] Service redeployed
