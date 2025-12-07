# Setting Up MongoDB for Railway Deployment

## The Problem
Your Railway deployment is crashing because `MONGODB_URI` environment variable is missing or incorrect.

## Solution: Add MongoDB Connection String

### Option 1: MongoDB Atlas (Recommended - Free Tier Available)

1. **Create a MongoDB Atlas Account** (if you don't have one):
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create a Cluster**:
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a cloud provider and region
   - Click "Create"

3. **Set Up Database Access**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (or add Railway's IP ranges)
   - Click "Confirm"

5. **Get Your Connection String**:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/recipehub?retryWrites=true&w=majority`)
   - **Replace `<password>` with your actual password**
   - **Replace `<dbname>` with `recipehub`** (or your preferred database name)

6. **Add to Railway**:
   - Go to Railway Dashboard → `recipehub-backend` → "Variables" tab
   - Click "+ New Variable"
   - **Name**: `MONGODB_URI`
   - **Value**: Your connection string (with password and dbname replaced)
   - Click "Add"
   - Railway will automatically redeploy

### Option 2: Railway MongoDB Plugin (Easier)

1. **Add MongoDB Service**:
   - In Railway Dashboard, click "+ New" → "Database" → "Add MongoDB"
   - Railway will create a MongoDB instance for you

2. **Get Connection String**:
   - Click on the MongoDB service
   - Go to "Variables" tab
   - Find `MONGO_URL` or `MONGODB_URI`
   - Copy the value

3. **Add to Backend Service**:
   - Go to `recipehub-backend` → "Variables" tab
   - Click "+ New Variable"
   - **Name**: `MONGODB_URI`
   - **Value**: Paste the connection string from step 2
   - Click "Add"

4. **Link Services** (if needed):
   - In `recipehub-backend` settings, you can also "Link" the MongoDB service
   - Railway will automatically share the connection string

## Verify Your Setup

After adding `MONGODB_URI`:

1. **Check Railway Logs**:
   - Go to `recipehub-backend` → "Deployments" tab
   - Click on the latest deployment
   - Check "Deploy Logs"
   - You should see: `MongoDB Connected: ...` (not connection errors)

2. **Test the API**:
   - Visit: `https://recipehub-backend-production.up.railway.app/health`
   - Should return: `{"status":"OK",...}`

## Common Issues

### Issue: "querySrv ENOTFOUND"
- **Cause**: Missing or incorrect `MONGODB_URI`
- **Fix**: Double-check the connection string in Railway Variables

### Issue: "Authentication failed"
- **Cause**: Wrong password in connection string
- **Fix**: Make sure you replaced `<password>` with your actual MongoDB password

### Issue: "IP not whitelisted"
- **Cause**: Your IP isn't allowed in MongoDB Atlas Network Access
- **Fix**: Add `0.0.0.0/0` (allow all IPs) or Railway's specific IP ranges

### Issue: Connection string format
- **Correct format**: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
- **Make sure**: No spaces, password is URL-encoded if it has special characters

## Example Connection String

```
mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/recipehub?retryWrites=true&w=majority
```

Replace:
- `myuser` → Your MongoDB username
- `mypassword123` → Your MongoDB password
- `cluster0.abc123` → Your cluster address
- `recipehub` → Your database name

## Next Steps

Once MongoDB is connected:
1. The app will automatically start
2. You can seed the database by running `node seed.js` locally (or create a Railway script)
3. Your API endpoints will work properly
