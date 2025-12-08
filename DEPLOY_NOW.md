# 🚀 Deploy RecipeHub - Step by Step Guide

Follow these steps to deploy your RecipeHub application to production.

## 📋 Prerequisites

- ✅ Code pushed to GitHub: `https://github.com/preetvardhan10/RecipieHub`
- ✅ PostgreSQL database (Neon DB recommended - you already have one!)
- ✅ Render account (sign up at https://render.com - free tier available)
- ✅ Vercel account (sign up at https://vercel.com - free tier available)

---

## Part 1: Deploy Backend to Render

### Step 1: Get Your Database URL

You already have a Neon DB connection string. Make sure you have it ready:
```
postgresql://neondb_owner:npg_4D5wEuaSWObU@ep-snowy-hall-ahjaamyt-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Step 2: Deploy to Render

**Choose one method:**

#### Option A: New Web Service (Recommended - More Control)

1. **Go to Render Dashboard:**
   - Visit https://dashboard.render.com
   - Sign up or log in

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select repository: `preetvardhan10/RecipieHub`
   - Click "Connect"

3. **Configure the service:**
   - **Name:** `recipehub-backend`
   - **Environment:** `Node`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend` ⚠️ **IMPORTANT!**
   - **Build Command:** `npm install && npm run prisma:generate`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid if you prefer)

4. Click "Create Web Service"

#### Option B: Blueprint (Easier - Auto-configures from render.yaml)

1. **Go to Render Dashboard:**
   - Visit https://dashboard.render.com
   - Sign up or log in

2. **Create New Blueprint:**
   - Click "New +" → "Blueprint"
   - Connect your GitHub account
   - Select repository: `preetvardhan10/RecipieHub`
   - Click "Apply"

3. **Render will auto-detect `backend/render.yaml`** ✅
   - It will create the service with settings from the YAML file
   - You still need to add environment variables manually

### Step 3: Set Environment Variables

In Render dashboard, go to your service → **Environment** tab, add these:

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://neondb_owner:npg_4D5wEuaSWObU@ep-snowy-hall-ahjaamyt-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your-strong-random-secret-key-here
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-app.vercel.app
OPENAI_API_KEY=sk-your-key (optional)
```

**Generate JWT_SECRET:**
```bash
openssl rand -base64 32
```

Or use an online generator: https://randomkeygen.com/

**Important:** 
- Set `FRONTEND_URL` to a placeholder for now (we'll update it after frontend deployment)
- `OPENAI_API_KEY` is optional (fallback will be used if not provided)

### Step 4: Wait for Deployment

- Render will build and deploy your backend
- This takes 5-10 minutes
- Watch the build logs for any errors

### Step 5: Run Database Migrations

After deployment completes:

1. Go to your Render service
2. Click **"Shell"** tab
3. Run:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```
4. (Optional) Seed database:
   ```bash
   npm run seed
   ```

### Step 6: Test Backend

1. Copy your backend URL (e.g., `https://recipehub-backend.onrender.com`)
2. Test health endpoint: `https://your-backend.onrender.com/api/health`
3. Should return: `{"success":true,"message":"RecipeHub API is running"}`

**✅ Backend is now live!** Save your backend URL for the next step.

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Go to Vercel

1. Visit https://vercel.com
2. Sign up or log in with GitHub

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Import from GitHub
3. Select repository: `preetvardhan10/RecipieHub`

### Step 3: Configure Project

Vercel should auto-detect Vite, but verify:

- **Framework Preset:** `Vite`
- **Root Directory:** `frontend` ⚠️ **IMPORTANT!**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Step 4: Add Environment Variable

In **Environment Variables** section, add:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Replace `your-backend-url` with your actual Render backend URL.

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Vercel will give you a URL like: `https://recipie-hub.vercel.app`

**✅ Frontend is now live!** Save your frontend URL.

---

## Part 3: Update CORS Configuration

### Step 1: Update Backend Environment Variable

1. Go back to Render dashboard
2. Go to your backend service → **Environment** tab
3. Update `FRONTEND_URL` with your Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
4. Click **"Save Changes"**
5. Render will automatically redeploy

### Step 2: Verify Everything Works

1. Visit your Vercel frontend URL
2. Try signing up with a new account
3. Test creating a recipe
4. Test AI suggestions
5. Test meal planner

---

## 🎉 Deployment Complete!

Your app is now live at:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.onrender.com`

---

## 🔧 Troubleshooting

### Backend Issues

**Build fails:**
- Check build logs in Render
- Ensure all dependencies are in `package.json`
- Verify Prisma generates correctly

**Database connection error:**
- Verify `DATABASE_URL` is correct
- Check Neon DB dashboard for connection status
- Ensure database is not paused

**502 Bad Gateway:**
- Check service logs in Render
- Verify `PORT` is set to `10000`
- Check if database migrations ran successfully

### Frontend Issues

**Can't connect to backend:**
- Verify `VITE_API_URL` is correct
- Check backend is running (test `/api/health`)
- Check browser console for CORS errors

**Build fails:**
- Check build logs in Vercel
- Ensure all dependencies are installed
- Verify `frontend/package.json` is correct

### CORS Errors

If you see CORS errors:
1. Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
2. No trailing slash in `FRONTEND_URL`
3. Wait for backend to redeploy after updating `FRONTEND_URL`

---

## 📝 Quick Reference

### Backend Environment Variables (Render)
```
NODE_ENV=production
PORT=10000
DATABASE_URL=your-postgresql-connection-string
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-app.vercel.app
OPENAI_API_KEY=sk-your-key (optional)
```

### Frontend Environment Variables (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🆘 Need Help?

1. **Check Logs:**
   - Render: Service → Logs tab
   - Vercel: Project → Deployments → View Function Logs

2. **Test Endpoints:**
   - Backend health: `https://your-backend.onrender.com/api/health`
   - Use Postman or curl to test API

3. **Common Issues:**
   - Database not accessible → Check Neon DB dashboard
   - CORS errors → Verify FRONTEND_URL matches exactly
   - Build fails → Check logs for specific error

---

## ✨ Next Steps

After deployment:
- [ ] Test all features
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring (optional)
- [ ] Set up CI/CD (optional)

Good luck with your deployment! 🚀

