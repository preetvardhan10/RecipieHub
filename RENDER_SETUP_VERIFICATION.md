# ✅ Render Setup Verification Checklist

## ✅ STEP 1: package.json Verification

**Status**: ✅ **CORRECT**

Your `backend/package.json` contains:
```json
{
  "scripts": {
    "start": "node index.js"  ✅ CORRECT
  }
}
```

**Entry file**: `index.js` ✅ EXISTS

---

## ✅ STEP 2: Service Type Check

**In Render Dashboard, verify:**

- [ ] **Service Type**: Must be **"Web Service"** (NOT "Static Site")
- [ ] **Environment**: Must be **"Node"**

**If you see "Static Site":**
- ❌ Delete it
- ✅ Create a new "Web Service" instead

---

## ✅ STEP 3: Root Directory Check

**CRITICAL SETTING:**

In Render Dashboard → Settings → Build & Deploy:

- [ ] **Root Directory**: Must be set to `backend`

**Why?**
Your structure is:
```
/recipieHub
  /backend
    package.json  ← Render needs to find this
    index.js
  /frontend
```

**If Root Directory is empty or `/`:**
- Render won't find `package.json`
- Deployment will fail

**Fix**: Set Root Directory to `backend`

---

## ✅ STEP 4: Build & Start Commands

**In Render Dashboard → Settings, verify:**

- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`

**These should be set automatically, but verify they're correct.**

---

## ✅ STEP 5: Complete Render Configuration

### Service Settings:
```
Name: recipehub-backend (or any name)
Environment: Node
Region: (choose closest)
Branch: main
Root Directory: backend  ← CRITICAL!
Build Command: npm install
Start Command: npm start
Auto-Deploy: Yes
```

### Environment Variables (Required):
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipehub?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:3000
```

---

## 🔍 How to Verify in Render Dashboard

### 1. Check Service Type
- Go to your service
- Look at the top - should say "Web Service"
- If it says "Static Site" → Delete and recreate

### 2. Check Root Directory
- Go to Settings tab
- Scroll to "Build & Deploy" section
- Look for "Root Directory" field
- **Must say**: `backend`

### 3. Check Commands
- Same Settings page
- **Build Command**: Should be `npm install`
- **Start Command**: Should be `npm start`

### 4. Check Environment Variables
- Go to Environment tab
- Verify all required variables are listed

---

## 🚨 Common Issues & Fixes

### Issue 1: "Deploy" button does nothing
**Cause**: Root Directory not set to `backend`
**Fix**: Set Root Directory to `backend` in Settings

### Issue 2: Build fails with "package.json not found"
**Cause**: Root Directory is wrong
**Fix**: Set Root Directory to `backend`

### Issue 3: Service type is "Static Site"
**Cause**: Wrong service type selected
**Fix**: Delete service, create new "Web Service"

### Issue 4: Render session bug
**Fix**: 
1. Log out of Render
2. Close tab
3. Open Incognito window
4. Log in fresh
5. Try again

---

## 📋 Exact Settings to Copy

When creating/editing your Render service:

**Basic Settings:**
- Service Type: **Web Service**
- Environment: **Node**
- Root Directory: **backend**
- Branch: **main**

**Build & Deploy:**
- Build Command: **npm install**
- Start Command: **npm start**

**Environment Variables:**
- NODE_ENV: **production**
- MONGODB_URI: **your-connection-string**
- JWT_SECRET: **your-secret-key**
- FRONTEND_URL: **http://localhost:3000**

---

## ✅ Verification Commands

After deployment, test:

```bash
# Health check
curl https://your-service.onrender.com/health

# Should return:
# {"status":"OK","timestamp":"...","environment":"production"}
```

---

## 📸 What to Check in Render Dashboard

Please verify these settings and share if anything is different:

1. **Service Type**: Web Service or Static Site?
2. **Root Directory**: What does it say? (should be `backend`)
3. **Build Command**: What does it say? (should be `npm install`)
4. **Start Command**: What does it say? (should be `npm start`)

---

## 🎯 Quick Fix Summary

If deployment still doesn't work:

1. ✅ Verify package.json has `"start": "node index.js"` (DONE - it's correct)
2. ✅ Check Root Directory is set to `backend`
3. ✅ Verify Service Type is "Web Service" (not "Static Site")
4. ✅ Check Build Command: `npm install`
5. ✅ Check Start Command: `npm start`
6. ✅ Add all environment variables
7. ✅ Try logging out and back in (session bug fix)
