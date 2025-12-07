# Quick Fix: Railway MongoDB Connection Error

## The Error
```
getaddrinfo ENOTFOUND mongodb.railway.internal
```

## Solution: Use MongoDB Atlas (5 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)

### Step 2: Create Free Cluster
1. Click "Build a Database"
2. Choose "FREE" (M0)
3. Select a region (choose closest to your Railway region)
4. Click "Create"

### Step 3: Set Up Database User
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Username: `recipehub` (or any name)
4. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
5. Database User Privileges: "Atlas admin"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (adds `0.0.0.0/0`)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" → Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: "Node.js", Version: "5.5 or later"
4. Copy the connection string

It looks like:
```
mongodb+srv://recipehub:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 6: Update Railway
1. Go to Railway → `recipehub-backend` → "Variables"
2. Find `MONGO_URL` or add `MONGODB_URI`
3. Edit the variable
4. Replace the value with your Atlas connection string
5. **IMPORTANT**: Replace `<password>` with the password you saved in Step 3
6. **IMPORTANT**: Add database name: Change `/?retryWrites` to `/recipehub?retryWrites`
7. Final format should be:
   ```
   mongodb+srv://recipehub:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/recipehub?retryWrites=true&w=majority
   ```
8. Click "Save"

### Step 7: Verify
1. Railway will auto-redeploy
2. Check "Deploy Logs"
3. Should see: `MongoDB Connected: cluster0.xxxxx.mongodb.net` ✅

## Example Connection String

**Before (with placeholders):**
```
mongodb+srv://recipehub:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

**After (with real password and database):**
```
mongodb+srv://recipehub:MySecurePassword123@cluster0.abc123.mongodb.net/recipehub?retryWrites=true&w=majority
```

## Why This Works

- ✅ MongoDB Atlas is external (not dependent on Railway service linking)
- ✅ Works immediately
- ✅ Free tier available
- ✅ More reliable for production
- ✅ No internal networking issues

## Troubleshooting

### Still getting connection errors?
- Double-check password is correct (no `<password>` placeholder)
- Verify database name is in the URL (`/recipehub`)
- Check Network Access allows `0.0.0.0/0`
- Wait 2-3 minutes after creating cluster (takes time to provision)

### Password has special characters?
- URL-encode special characters:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `%` → `%25`
- Or use Atlas "Autogenerate Secure Password" (no special chars)
