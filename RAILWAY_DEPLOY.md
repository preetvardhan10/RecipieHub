# 🚂 Deploy RecipeHub to Railway - Complete Guide

Railway is simpler than Render! Follow these steps to deploy your backend.

## 📋 Prerequisites

- ✅ Code pushed to GitHub: `https://github.com/preetvardhan10/RecipieHub`
- ✅ PostgreSQL database (Neon DB - you already have one!)
- ✅ Railway account (sign up at https://railway.app - free tier available)

---

## Part 1: Deploy Backend to Railway

### Step 1: Get Your Database URL

You already have a Neon DB connection string:
```
postgresql://neondb_owner:npg_4D5wEuaSWObU@ep-snowy-hall-ahjaamyt-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Step 2: Create Railway Project

1. **Go to Railway Dashboard:**
   - Visit https://railway.app
   - Sign up or log in (use GitHub for easy integration)

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your GitHub
   - Select repository: `preetvardhan10/RecipieHub`
   - Click "Deploy Now"

### Step 3: Configure the Service

Railway will auto-detect it's a Node.js project, but we need to configure it:

1. **Click on the service** (it will be named after your repo)

2. **Go to Settings tab:**

   - **Root Directory:** Set to `backend` ⚠️ **IMPORTANT!**
   - **Build Command:** `npm install && npm run prisma:generate` ⚠️ **REQUIRED!**
   - **Start Command:** `npm start`
   - **Note:** The `postinstall` script also runs `prisma generate`, but it's safer to be explicit in the build command ✅

3. **Go to Variables tab** and add these environment variables:

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

Or use: https://randomkeygen.com/

**Important:** 
- Set `FRONTEND_URL` to a placeholder for now (we'll update it after frontend deployment)
- `OPENAI_API_KEY` is optional (fallback will be used if not provided)

### Step 4: Wait for Deployment

- Railway will automatically build and deploy
- This takes 3-5 minutes
- Watch the build logs in the "Deployments" tab

### Step 5: Run Database Migrations

After deployment completes:

1. Go to your Railway service
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. Click **"View Logs"** to see if it's running

5. **Run migrations via Railway CLI** (recommended):
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login
   railway login
   
   # Link to your project
   railway link
   
   # Run migrations
   cd backend
   railway run npm run prisma:deploy
   
   # Seed database (optional)
   railway run npm run seed
   ```

   **OR** use Railway's web terminal:

6. **Via Web Terminal:**
   - Go to your service → "Deployments" tab
   - Click on the latest deployment
   - Click "View Logs"
   - Click "Open Shell" (if available)
   - Run:
     ```bash
     cd backend
     npm run prisma:deploy
     npm run seed
     ```

### Step 6: Get Your Backend URL

1. Go to your Railway service
2. Click **"Settings"** tab
3. Scroll to **"Domains"** section
4. Railway automatically generates a domain like: `https://your-app.up.railway.app`
5. Copy this URL - you'll need it for the frontend!

**Your backend API will be at:** `https://your-app.up.railway.app/api`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

1. **Update frontend environment:**
   - Go to `frontend/.env` or create it
   - Add:
     ```env
     VITE_API_URL=https://your-app.up.railway.app/api
     ```
   - Replace `your-app.up.railway.app` with your actual Railway URL

2. **Commit and push:**
   ```bash
   git add frontend/.env
   git commit -m "Update API URL for Railway deployment"
   git push origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign up or log in (use GitHub)

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Import `preetvardhan10/RecipieHub`
   - Click "Import"

3. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Environment Variables:**
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-app.up.railway.app/api
     ```
   - Replace with your actual Railway backend URL

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Vercel will give you a URL like: `https://your-app.vercel.app`

### Step 3: Update Backend CORS

1. Go back to Railway
2. Go to your service → **Variables** tab
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
4. Railway will automatically redeploy

---

## Part 3: Verify Deployment

### Test Your Backend

1. **Health Check:**
   ```
   https://your-app.up.railway.app/api/health
   ```
   Should return: `{"status":"ok"}`

2. **Test API:**
   ```
   https://your-app.up.railway.app/api/recipes
   ```
   Should return recipes list

### Test Your Frontend

1. Visit your Vercel URL
2. Try signing up / logging in
3. Browse recipes
4. Create a recipe
5. Test AI suggestions

---

## Troubleshooting

### Backend Issues

**Problem: "Cannot connect to database"**
- Check `DATABASE_URL` in Railway Variables
- Ensure Neon DB allows connections from Railway IPs
- Check Railway logs for connection errors

**Problem: "Prisma Client not generated"**
- Railway should run `postinstall` automatically
- Check build logs to see if `prisma generate` ran
- If not, add to build command: `npm install && npm run prisma:generate`

**Problem: "Port already in use"**
- Railway sets `PORT` automatically
- Remove `PORT` from Variables or set it to `${{PORT}}`
- Update `server.js` to use `process.env.PORT || 10000`

**Problem: "Migrations failed"**
- Run `railway run npm run prisma:deploy` manually
- Check database connection string
- Ensure database is accessible

### Frontend Issues

**Problem: "CORS error"**
- Update `FRONTEND_URL` in Railway Variables
- Ensure it matches your Vercel URL exactly (no trailing slash)
- Redeploy backend after updating

**Problem: "API not found"**
- Check `VITE_API_URL` in Vercel Environment Variables
- Ensure it ends with `/api`
- Rebuild frontend after updating

**Problem: "Cannot fetch recipes"**
- Check browser console for errors
- Verify backend URL is correct
- Test backend health endpoint directly

---

## Railway vs Render

### Why Railway is Better:

✅ **Simpler setup** - Auto-detects Node.js projects  
✅ **Better free tier** - More generous limits  
✅ **Faster deployments** - Usually 2-3 minutes  
✅ **Built-in CLI** - Easy database migrations  
✅ **Better logs** - Cleaner interface  
✅ **Auto HTTPS** - SSL certificates included  

### Railway Free Tier Limits:

- 500 hours/month (enough for always-on service)
- $5 credit/month
- Unlimited deployments
- Custom domains included

---

## Next Steps

1. ✅ Backend deployed on Railway
2. ✅ Frontend deployed on Vercel
3. ✅ Database migrations run
4. ✅ Environment variables set
5. ✅ CORS configured

**Your app is live! 🎉**

---

## Useful Commands

```bash
# Railway CLI
railway login
railway link
railway status
railway logs
railway run npm run prisma:studio  # Open Prisma Studio
railway run npm run seed           # Seed database
railway run npm run prisma:deploy  # Run migrations
```

---

## Support

If you encounter issues:
1. Check Railway logs: Service → Deployments → View Logs
2. Check Vercel logs: Project → Deployments → View Logs
3. Verify all environment variables are set correctly
4. Ensure database is accessible from Railway

---

**Happy Deploying! 🚂**

