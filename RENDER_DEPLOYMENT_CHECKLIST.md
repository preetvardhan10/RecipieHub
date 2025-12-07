# Render Deployment Checklist - Step by Step

## ✅ Configuration Settings (Check These in Render Dashboard)

### 1. Basic Settings
- [ ] **Name**: `recipehub-backend` (or any name)
- [ ] **Environment**: `Node`
- [ ] **Region**: Choose closest to you
- [ ] **Branch**: `main`
- [ ] **Root Directory**: `backend` ⚠️ **CRITICAL - Must be set!**
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`

### 2. Environment Variables (You have these, but verify values)

**Required Variables:**
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipehub?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-minimum-32-characters-long
FRONTEND_URL=http://localhost:3000
```

**Optional (but recommended):**
```
OPENAI_API_KEY=sk-your-openai-key-here
```

### 3. Common Issues & Fixes

#### Issue: "Root Directory" not set
**Fix**: Set Root Directory to `backend` in Render settings

#### Issue: MongoDB connection fails
**Check**:
1. MongoDB Atlas → Network Access → Add IP `0.0.0.0/0`
2. Connection string format: `mongodb+srv://user:pass@cluster.mongodb.net/recipehub`
3. Replace special characters in password with URL encoding:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`

#### Issue: Build fails
**Check**:
- Root Directory is `backend`
- Build Command is `npm install`
- package.json exists in backend folder

#### Issue: Service won't start
**Check**:
- Start Command is `npm start`
- All environment variables are set
- Check logs for specific error messages

## 🔍 How to Debug

### Step 1: Check Build Logs
1. Go to Render Dashboard
2. Click your service
3. Click "Logs" tab
4. Look at "Build Logs" section
5. Check for red error messages

### Step 2: Check Runtime Logs
1. Same "Logs" tab
2. Look at "Runtime Logs" section
3. Check for:
   - "Server running on port..."
   - "MongoDB Connected..."
   - Any error messages

### Step 3: Test Endpoints
After deployment, test:
```bash
# Health check (should work even if DB fails)
curl https://your-service.onrender.com/health

# Root endpoint
curl https://your-service.onrender.com/

# Should return JSON responses
```

## 🚨 Most Common Problems

### Problem 1: Root Directory Missing
**Symptom**: Build fails with "package.json not found"
**Fix**: Set Root Directory to `backend` in Render settings

### Problem 2: MongoDB Connection String Wrong
**Symptom**: Service starts but crashes, logs show "MongoDB connection error"
**Fix**: 
- Verify connection string in MongoDB Atlas
- Check IP whitelist includes `0.0.0.0/0`
- URL-encode special characters in password

### Problem 3: Missing NODE_ENV
**Symptom**: Service works but behaves like development
**Fix**: Add `NODE_ENV=production` environment variable

### Problem 4: JWT_SECRET Too Short
**Symptom**: Authentication doesn't work
**Fix**: Use at least 32 characters. Generate with:
```bash
openssl rand -base64 32
```

## 📋 Exact Render Settings

Copy these exact settings:

```
Name: recipehub-backend
Environment: Node
Region: (choose closest)
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: npm start
Auto-Deploy: Yes
```

## 🔧 Quick Fixes

### Fix 1: Add Missing NODE_ENV
If not already added:
```
NODE_ENV=production
```

### Fix 2: Verify MongoDB URI Format
Should look like:
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/recipehub?retryWrites=true&w=majority
```

### Fix 3: Generate Secure JWT_SECRET
Run this command locally:
```bash
openssl rand -base64 32
```
Copy the output and use as JWT_SECRET value.

## 📞 Still Not Working?

Share these details:
1. **Error from Build Logs** (screenshot or copy text)
2. **Error from Runtime Logs** (screenshot or copy text)
3. **Your Render service URL**
4. **Which step fails**: Build, Deploy, or Runtime?
