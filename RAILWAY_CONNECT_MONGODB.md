# Connect MongoDB to Backend Service in Railway

## Quick Steps

You're currently viewing the **MongoDB service** variables. You need to connect these to your **recipehub-backend** service.

### Method 1: Using Variable Reference (Recommended)

1. **Go to your Backend Service**:
   - In Railway Dashboard, click on **`recipehub-backend`** (not MongoDB)
   - Click on the **"Variables"** tab

2. **Add Variable Reference**:
   - Click **"+ New Variable"**
   - In the variable name field, type: `MONGODB_URI`
   - Instead of typing a value, click on **"Reference"** or look for a dropdown/button that says "Reference Variable"
   - Select: **MongoDB** → **MONGO_URL**
   - Click **"Add"**

   This will create a reference like: `${{MongoDB.MONGO_URL}}`

3. **Verify**:
   - You should now see `MONGODB_URI` in your backend service variables
   - Railway will automatically redeploy

### Method 2: Manual Copy (Alternative)

If the reference method doesn't work:

1. **Copy MONGO_URL from MongoDB service**:
   - In the MongoDB service Variables tab (where you are now)
   - Click the "eye" icon next to `MONGO_URL` to reveal it
   - Click the "copy" icon to copy the value

2. **Add to Backend Service**:
   - Go to **`recipehub-backend`** → **"Variables"** tab
   - Click **"+ New Variable"**
   - **Name**: `MONGODB_URI`
   - **Value**: Paste the `MONGO_URL` you copied
   - Click **"Add"**

## What You Should See

After adding `MONGODB_URI` to your backend service:

1. **Check Deployments**:
   - Go to `recipehub-backend` → "Deployments" tab
   - Wait for the new deployment to complete
   - Check "Deploy Logs"
   - You should see: `MongoDB Connected: ...` ✅

2. **Verify the App is Running**:
   - Check the deployment status - should be "Active" (green)
   - Visit: `https://recipehub-backend-production.up.railway.app/health`
   - Should return: `{"status":"OK",...}`

## Troubleshooting

### If you see "querySrv ENOTFOUND" error:
- Make sure `MONGODB_URI` is set in the **backend service** (not just MongoDB service)
- Verify the variable name is exactly `MONGODB_URI` (case-sensitive)

### If the reference doesn't work:
- Use Method 2 (manual copy) instead
- Make sure you're copying `MONGO_URL` from MongoDB service

### If connection still fails:
- Check that MongoDB service shows "Online" status
- Verify the `MONGO_URL` format is correct (should start with `mongodb://` or `mongodb+srv://`)

## Next Steps

Once MongoDB is connected:
1. ✅ App will start successfully
2. ✅ All API endpoints will work
3. ✅ You can seed the database (run `node seed.js` locally, or create a Railway script)
