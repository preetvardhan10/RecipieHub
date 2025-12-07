# Fix Railway MongoDB Connection: Service Linking

## The Problem

Error: `getaddrinfo ENOTFOUND mongodb.railway.internal`

This means your `recipehub-backend` service cannot find the MongoDB service. The services need to be **linked** in Railway.

## Solution: Link MongoDB Service to Backend

### Method 1: Link Services in Railway Dashboard (Recommended)

1. **Go to Backend Service Settings**:
   - Railway Dashboard → `recipehub-backend` → "Settings" tab
   - Scroll down to "Service Connections" or "Connected Services"

2. **Link MongoDB Service**:
   - Click "Connect Service" or "+ Add Service"
   - Select your MongoDB service from the list
   - Railway will automatically share the connection string

3. **Verify Connection String**:
   - Go to `recipehub-backend` → "Variables" tab
   - Check that `MONGO_URL` is now set correctly
   - It should reference the MongoDB service (you might see it as a reference variable)

4. **Redeploy**:
   - Railway should auto-redeploy
   - Or manually trigger: "Deployments" → "Redeploy"

### Method 2: Use MongoDB Atlas (Alternative)

If linking doesn't work, use MongoDB Atlas instead:

1. **Create MongoDB Atlas Account**:
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Create a free cluster

2. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

3. **Update Railway Variable**:
   - Go to `recipehub-backend` → "Variables"
   - Edit `MONGO_URL` or add `MONGODB_URI`
   - Paste your Atlas connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `recipehub`

4. **Redeploy**:
   - Railway will auto-redeploy

### Method 3: Check Railway Service Architecture

1. **Verify Services are in Same Project**:
   - Both `recipehub-backend` and MongoDB should be in the same Railway project
   - Check the left sidebar - both services should be listed

2. **Check Service Status**:
   - MongoDB service should show "Online"
   - Backend service should show "Online" (after linking)

3. **Verify Internal Network**:
   - Railway services in the same project can communicate via internal network
   - The `mongodb.railway.internal` hostname only works when services are properly linked

## Quick Fix Steps

1. ✅ Go to `recipehub-backend` → "Settings"
2. ✅ Find "Service Connections" or "Connected Services"
3. ✅ Link your MongoDB service
4. ✅ Check `MONGO_URL` variable is updated
5. ✅ Wait for auto-redeploy or manually redeploy
6. ✅ Check logs - should see "MongoDB Connected"

## Troubleshooting

### Issue: Can't find "Service Connections" in Settings
- **Solution**: Look for "Variables" tab → Check if MongoDB variables are available as references
- Or use Method 2 (MongoDB Atlas) instead

### Issue: Still getting ENOTFOUND after linking
- **Solution**: 
  1. Delete the `MONGO_URL` variable
  2. Re-link the services
  3. Railway should auto-populate the correct connection string

### Issue: Services are in different projects
- **Solution**: Move both services to the same Railway project, or use MongoDB Atlas (external)

## Recommended Approach

**For Production**: Use MongoDB Atlas (Method 2)
- More reliable
- Better for scaling
- Free tier available
- Works regardless of Railway service linking

**For Development**: Link Railway services (Method 1)
- Uses Railway's internal network
- No external dependencies
- Easier to manage in one place
