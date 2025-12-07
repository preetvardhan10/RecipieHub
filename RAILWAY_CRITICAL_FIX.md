# 🚨 CRITICAL: Set Root Directory in Railway

## The Problem
Railway is running commands from the **repository root** instead of the `backend` directory, so it can't find `package.json`.

## ✅ THE FIX (Do This Now!)

### In Railway Dashboard:

1. **Go to your service**: `recipehub-backend`
2. **Click "Settings" tab** (top navigation)
3. **Scroll to "Service" section**
4. **Find "Root Directory" field**
5. **Set it to**: `backend` (just the word, no slashes)
6. **Click "Save" or "Update"**

### After Setting Root Directory:

Railway will automatically:
- ✅ Redeploy with the correct directory
- ✅ Find `package.json` in `backend/`
- ✅ Run `npm install` in the right place
- ✅ Start with `node index.js`

## What You Should See After Fix:

**Build Logs:**
```
Installing Node.js 18.x
Running: npm install (in backend directory)
✓ Dependencies installed
Starting: node index.js
✓ Server running on port...
```

## If Root Directory Field Doesn't Exist:

Some Railway interfaces don't show Root Directory in Settings. Try:

### Option 1: Update Build/Start Commands
In Settings → Deploy:
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && node index.js`

### Option 2: Move Files to Root (Not Recommended)
This would require restructuring your project.

## Quick Steps:

1. Railway Dashboard → `recipehub-backend` service
2. Settings tab
3. Root Directory: `backend`
4. Save
5. Wait for auto-redeploy
6. Check build logs

**This is the most important step!** Without Root Directory set, Railway can't find your `package.json`.
