# Render Deployment Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: Build Fails

**Error**: `npm install` fails or times out

**Solutions**:
1. Check Render logs for specific error messages
2. Ensure `package.json` is in the `backend` directory
3. Try clearing build cache in Render dashboard
4. Check if all dependencies are listed in `package.json`

**Fix**: Update build command to:
```
npm install --production=false
```

### Issue 2: Service Won't Start

**Error**: Service keeps restarting or shows "Deploy failed"

**Solutions**:
1. **Check PORT**: Render automatically sets PORT, ensure your code uses `process.env.PORT`
2. **Check logs**: Go to Render dashboard → Your service → Logs tab
3. **Database connection**: Ensure MongoDB URI is set correctly
4. **Missing environment variables**: Check all required env vars are set

**Common fixes**:
- Server must listen on `0.0.0.0`, not `localhost`
- PORT must come from `process.env.PORT`
- All environment variables must be set

### Issue 3: MongoDB Connection Error

**Error**: `MongoDB connection error` or `MongooseServerSelectionError`

**Solutions**:
1. **Check MongoDB Atlas**:
   - Go to MongoDB Atlas → Network Access
   - Add IP: `0.0.0.0/0` (allows all IPs)
   - Or add Render's IP ranges

2. **Check Connection String**:
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/recipehub?retryWrites=true&w=majority`
   - Replace `username` and `password` with your actual credentials
   - Ensure password is URL-encoded if it contains special characters

3. **Verify Database User**:
   - User must have read/write permissions
   - Check user exists in MongoDB Atlas

### Issue 4: Environment Variables Not Set

**Error**: Service starts but API calls fail

**Solutions**:
1. Go to Render Dashboard → Your Service → Environment
2. Add all required variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_connection_string
   JWT_SECRET=your_secret_key
   OPENAI_API_KEY=your_key (optional)
   FRONTEND_URL=your_frontend_url
   ```
3. Click "Save Changes" and redeploy

### Issue 5: CORS Errors

**Error**: Frontend can't connect to backend

**Solutions**:
1. Set `FRONTEND_URL` environment variable in Render
2. Update CORS in `index.js` to allow your frontend URL
3. For development, you can temporarily use: `FRONTEND_URL=*` (not recommended for production)

### Issue 6: Service Spins Down

**Error**: First request takes 30-60 seconds

**Solutions**:
- This is normal for Render free tier
- Service spins down after 15 minutes of inactivity
- First request wakes it up (takes time)
- Consider upgrading to paid plan for always-on service

## Step-by-Step Deployment Fix

### 1. Check Render Configuration

In Render Dashboard, verify:
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: `Node`

### 2. Verify Environment Variables

Required variables:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/recipehub
JWT_SECRET=your-secret-here
FRONTEND_URL=https://your-frontend.com
OPENAI_API_KEY=sk-... (optional)
```

### 3. Check Build Logs

1. Go to Render Dashboard
2. Click on your service
3. Click "Logs" tab
4. Look for errors in build or runtime logs

### 4. Test Health Endpoint

After deployment, test:
```bash
curl https://your-service.onrender.com/health
```

Should return:
```json
{"status":"OK","timestamp":"...","environment":"production"}
```

## Quick Fixes

### Fix 1: Update index.js for Render

Ensure server listens on `0.0.0.0`:
```javascript
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Fix 2: Add Error Handling

Wrap database connection in try-catch:
```javascript
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to start:', error);
  process.exit(1);
});
```

### Fix 3: Verify package.json

Ensure `start` script exists:
```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

## Debugging Commands

### Check if service is running:
```bash
curl https://your-service.onrender.com/health
```

### Check root endpoint:
```bash
curl https://your-service.onrender.com/
```

### Test API endpoint:
```bash
curl https://your-service.onrender.com/api/recipes?limit=5
```

## Still Not Working?

1. **Check Render Status**: https://status.render.com
2. **View Detailed Logs**: Render Dashboard → Service → Logs
3. **Test Locally First**: 
   ```bash
   cd backend
   npm install
   npm start
   ```
4. **Verify MongoDB Connection**: Test connection string locally
5. **Check Render Documentation**: https://render.com/docs

## Contact Support

If issues persist:
1. Check Render community forum
2. Contact Render support with:
   - Service logs
   - Error messages
   - Configuration details
