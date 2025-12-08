# 🚨 URGENT: Add Environment Variables in Railway

Your deployment is failing because **DATABASE_URL is not set**. Railway does NOT use `.env` files - you must add variables in the Railway dashboard.

## ⚡ Quick Fix (2 minutes)

### Step 1: Go to Railway Dashboard
1. Open https://railway.app
2. Click on your project
3. Click on your service (the one that's running)

### Step 2: Add Variables
1. Click the **"Variables"** tab (top menu)
2. Click **"New Variable"** button
3. Add these variables **ONE BY ONE**:

---

### Variable 1: DATABASE_URL (CRITICAL!)
- **Name:** `DATABASE_URL`
- **Value:** `postgresql://neondb_owner:npg_4D5wEuaSWObU@ep-snowy-hall-ahjaamyt-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require`
- Click **"Add"**

### Variable 2: NODE_ENV
- **Name:** `NODE_ENV`
- **Value:** `production`
- Click **"Add"**

### Variable 3: PORT
- **Name:** `PORT`
- **Value:** `10000`
- Click **"Add"**

### Variable 4: JWT_SECRET
- **Name:** `JWT_SECRET`
- **Value:** Generate one using:
  ```bash
  openssl rand -base64 32
  ```
  Or use: https://randomkeygen.com/ (copy a 256-bit key)
- Click **"Add"**

### Variable 5: JWT_EXPIRES_IN
- **Name:** `JWT_EXPIRES_IN`
- **Value:** `7d`
- Click **"Add"**

### Variable 6: FRONTEND_URL
- **Name:** `FRONTEND_URL`
- **Value:** `https://placeholder.vercel.app` (we'll update this after frontend deploy)
- Click **"Add"**

### Variable 7: OPENAI_API_KEY (Optional)
- **Name:** `OPENAI_API_KEY`
- **Value:** Your OpenAI API key (or leave empty - fallback will work)
- Click **"Add"**

---

## ✅ After Adding Variables

1. Railway will **automatically redeploy** your service
2. Wait 2-3 minutes for the deployment to complete
3. Check the **"Deployments"** tab → Click latest deployment → **"View Logs"**
4. You should see: `✅ PostgreSQL Connected via Prisma`

---

## 🎯 Visual Guide

```
Railway Dashboard
  └── Your Project
      └── Your Service
          └── [Variables Tab] ← Click here!
              └── [New Variable] ← Click to add each variable
```

---

## ❌ Common Mistakes

1. **Adding variables in `.env` file** - Railway doesn't read `.env` files!
2. **Forgetting to click "Add"** - Make sure each variable is saved
3. **Typo in variable name** - Must be exactly `DATABASE_URL` (case-sensitive)
4. **Missing quotes** - Don't add quotes around the value in Railway

---

## 🔍 Verify Variables Are Set

1. Go to Variables tab
2. You should see all 6-7 variables listed
3. If `DATABASE_URL` is missing, add it!

---

## 🆘 Still Not Working?

1. Check Railway logs: Service → Deployments → View Logs
2. Verify all variables are in the Variables tab
3. Make sure Railway has redeployed after adding variables
4. Check that `DATABASE_URL` value is correct (no extra spaces)

---

**Once you add `DATABASE_URL`, Railway will automatically redeploy and your app should work!** 🚀

