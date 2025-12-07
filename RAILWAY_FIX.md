# Fix Railway Build Error: "npm: not found"

## The Problem
Railway can't find `npm` during build. This means Node.js isn't being detected properly.

## Solution 1: Add Node.js Version to package.json (DONE)

I've updated your `backend/package.json` to include:
```json
"engines": {
  "node": "18.x",
  "npm": "9.x"
}
```

This tells Railway which Node.js version to use.

## Solution 2: Create nixpacks.toml (DONE)

I've created `backend/nixpacks.toml` which explicitly tells Railway to use Node.js.

## Next Steps:

### Step 1: Push Changes to GitHub
```bash
cd /Users/preetvardhan/Downloads/recipieHub
git add backend/package.json backend/nixpacks.toml
git commit -m "Fix Railway deployment - add Node.js configuration"
git push origin main
```

### Step 2: In Railway Dashboard
1. Go to your service: `recipehub-backend`
2. Click "Settings"
3. Verify **Root Directory** is set to: `backend`
4. Railway will auto-redeploy after the push

### Step 3: Check Build Logs
1. Go to "Deployments" tab
2. Watch the new build
3. Should see: "Installing Node.js 18.x"
4. Then: "npm install" should work

## Alternative: Manual Railway Settings

If auto-deploy doesn't work:

1. **Go to Railway Dashboard**
2. **Click your service** → **Settings**
3. **Check these settings**:
   - **Root Directory**: `backend` ✅
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Go to Variables tab**:
   - Add all environment variables:
     - `NODE_ENV=production`
     - `MONGODB_URI=your-connection-string`
     - `JWT_SECRET=your-secret`
     - `FRONTEND_URL=http://localhost:3000`
     - `OPENAI_API_KEY=your-key` (optional)

5. **Click "Redeploy"** button

## What Changed:

1. ✅ Added `engines` field to `package.json` - tells Railway which Node.js version
2. ✅ Created `nixpacks.toml` - explicit Railway build configuration
3. ✅ Both files are in `backend/` directory

After pushing these changes, Railway should detect Node.js and the build should succeed!
