# Deployment Guide

This guide will walk you through deploying RecipeHub to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account
- OpenAI API key
- Render account (for backend)
- Vercel account (for frontend)

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is fine)
3. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Set username and password
4. Whitelist IP addresses:
   - Go to Network Access
   - Add IP Address (use `0.0.0.0/0` for all IPs in production)
5. Get connection string:
   - Go to Clusters
   - Click Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

## Step 2: Database Migration

Before deploying, you need to run Prisma migrations:

1. **Local Setup** (for testing):
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma db push
   npm run seed  # Optional: seed initial data
   ```

2. **Production Migration**:
   - Prisma migrations will run automatically during Render build
   - Or manually run: `npx prisma migrate deploy` in Render shell

## Step 3: Backend Deployment (Render)

### Option A: Using Render Dashboard

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository and branch
5. Configure the service:
   - **Name**: `recipehub-backend`
   - **Environment**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run prisma:generate`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=your-postgresql-connection-string
   JWT_SECRET=generate-a-strong-random-secret-key
   JWT_EXPIRES_IN=7d
   OPENAI_API_KEY=your-openai-api-key (optional)
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
7. Click "Create Web Service"
8. Wait for deployment to complete
9. Copy the service URL (e.g., `https://recipehub-backend.onrender.com`)

### Option B: Using render.yaml (Recommended)

1. Ensure `backend/render.yaml` is in your repository
2. Go to Render Dashboard
3. Click "New +" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect `render.yaml` and configure the service
6. Set the environment variables in Render dashboard (DATABASE_URL, JWT_SECRET, etc.)

## Step 4: Frontend Deployment (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com/api
   ```
6. Click "Deploy"
7. Wait for deployment to complete
8. Copy the deployment URL

## Step 5: Update Backend CORS

1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy the backend service

## Step 6: Verify Deployment

1. Visit your Vercel frontend URL
2. Try registering a new user
3. Test creating a recipe
4. Test AI suggestions
5. Verify all features work correctly

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
JWT_SECRET=your-strong-random-secret-key-here
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=sk-your-openai-api-key (optional)
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## Troubleshooting

### Backend Issues

1. **Database connection errors**: 
   - Check DATABASE_URL is correct
   - Verify database is accessible (check IP whitelist if using external DB)
   - Ensure Prisma client is generated: `npm run prisma:generate`
2. **Prisma migration errors**: 
   - Run `npx prisma migrate deploy` in Render shell
   - Or use `npx prisma db push` for development
3. **JWT errors**: Verify JWT_SECRET is set correctly
4. **CORS errors**: Ensure FRONTEND_URL matches your Vercel URL exactly
5. **OpenAI errors**: Verify API key is correct and has credits (or use fallback)

### Frontend Issues

1. **API calls failing**: Check VITE_API_URL is correct
2. **Build errors**: Ensure all dependencies are in package.json
3. **Routing issues**: Verify vercel.json is configured correctly

## Custom Domain (Optional)

### Vercel Custom Domain
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Render Custom Domain
1. Go to your service settings in Render
2. Navigate to "Custom Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Monitoring

- **Render**: Check service logs in the Render dashboard
- **Vercel**: Check deployment logs and analytics
- **MongoDB Atlas**: Monitor database usage and performance

## Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] Database password is strong
- [ ] DATABASE_URL is secure and not exposed
- [ ] OpenAI API key is secure (if using)
- [ ] CORS is properly configured
- [ ] Environment variables are not exposed in code
- [ ] HTTPS is enabled (automatic on Vercel/Render)
- [ ] Prisma migrations are up to date

## Cost Estimation

- **PostgreSQL (Neon/Supabase)**: Free tier available
- **Render**: Free tier available (spins down after inactivity)
- **Vercel**: Free tier available (unlimited static hosting)
- **OpenAI API**: Pay-as-you-go (optional - fallback available)

## Support

If you encounter issues:
1. Check service logs in Render dashboard
2. Verify environment variables (especially DATABASE_URL)
3. Test API endpoints directly (use `/api/health` endpoint)
4. Check PostgreSQL database connection
5. Verify CORS configuration
6. Ensure Prisma client is generated: `npm run prisma:generate`
7. Check database migrations: `npx prisma migrate status`

