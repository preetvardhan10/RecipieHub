# Quick Render Deployment Guide

## Prerequisites Checklist

- [ ] GitHub repository with your code
- [ ] PostgreSQL database (Neon DB, Supabase, or Render PostgreSQL)
- [ ] Render account (sign up at https://render.com)

## Step 1: Set Up PostgreSQL Database

### Option A: Neon DB (Recommended - Free Tier)

1. Go to https://neon.tech and sign up
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:password@host/db?sslmode=require`)
4. Save this for Step 3

### Option B: Render PostgreSQL

1. In Render dashboard, click "New +" → "PostgreSQL"
2. Name it `recipehub-db`
3. Copy the Internal Database URL
4. Save this for Step 3

## Step 2: Deploy Backend to Render

### Method 1: Using render.yaml (Easiest)

1. Go to https://dashboard.render.com
2. Click "New +" → "Blueprint"
3. Connect your GitHub account
4. Select your repository
5. Render will detect `backend/render.yaml` automatically
6. Click "Apply"

### Method 2: Manual Setup

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `recipehub-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run prisma:generate`
   - **Start Command**: `npm start`
5. Click "Create Web Service"

## Step 3: Configure Environment Variables

In Render dashboard, go to your service → Environment tab, add:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=your-postgresql-connection-string-here
JWT_SECRET=generate-a-strong-random-secret-here
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=sk-your-key-here (optional)
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Important:**
- Generate a strong JWT_SECRET (use: `openssl rand -base64 32`)
- Replace `DATABASE_URL` with your actual PostgreSQL connection string
- Set `FRONTEND_URL` after deploying frontend (or use placeholder for now)

## Step 4: Run Database Migrations

After first deployment:

1. Go to your Render service
2. Click "Shell" tab
3. Run:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```
4. (Optional) Seed database:
   ```bash
   npm run seed
   ```

## Step 5: Verify Deployment

1. Check your service URL (e.g., `https://recipehub-backend.onrender.com`)
2. Test health endpoint: `https://your-service.onrender.com/api/health`
3. Should return: `{"success":true,"message":"RecipeHub API is running"}`

## Step 6: Deploy Frontend (Vercel)

1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-render-backend.onrender.com/api
   ```
5. Deploy

## Step 7: Update CORS

1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy backend service

## Troubleshooting

### Build Fails
- Check build logs in Render
- Ensure `backend/package.json` has all dependencies
- Verify Prisma is generating: `npm run prisma:generate`

### Database Connection Errors
- Verify `DATABASE_URL` is correct
- Check database is accessible (IP whitelist if external)
- Test connection string locally first

### 502 Bad Gateway
- Check service logs
- Verify `PORT` is set to `10000`
- Ensure server is listening on `0.0.0.0`

### CORS Errors
- Verify `FRONTEND_URL` matches exactly (no trailing slash)
- Check backend CORS configuration in `server.js`

## Environment Variables Reference

| Variable | Example | Required |
|----------|---------|----------|
| `NODE_ENV` | `production` | Yes |
| `PORT` | `10000` | Yes |
| `DATABASE_URL` | `postgresql://...` | Yes |
| `JWT_SECRET` | `your-secret-key` | Yes |
| `JWT_EXPIRES_IN` | `7d` | Yes |
| `OPENAI_API_KEY` | `sk-...` | No |
| `FRONTEND_URL` | `https://app.vercel.app` | Yes |

## Support

- Render Docs: https://render.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Check service logs in Render dashboard for errors

