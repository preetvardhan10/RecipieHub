# Deploy Frontend to Vercel

This guide will help you deploy the RecipeHub frontend to Vercel.

## Prerequisites

1. ✅ Backend deployed on Railway (you should have the URL: `https://recipehub-backend-production.up.railway.app`)
2. ✅ GitHub account
3. ✅ Vercel account (free tier available)

## Step 1: Sign Up / Login to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub" (recommended for easy deployment)

## Step 2: Deploy from GitHub

1. **Import Project**:
   - In Vercel Dashboard, click "+ New Project"
   - Select your GitHub repository: `RecipieHub`
   - Click "Import"

2. **Configure Project**:
   - **Framework Preset**: Vercel should auto-detect "Create React App"
   - **Root Directory**: Click "Edit" and set to `frontend`
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `build` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)

3. **Environment Variables**:
   - Click "Environment Variables" section
   - Add the following variable:
     - **Name**: `REACT_APP_API_URL`
     - **Value**: `https://recipehub-backend-production.up.railway.app`
     - **Environment**: Select all (Production, Preview, Development)
     - Click "Add"

   ⚠️ **Important**: Replace `recipehub-backend-production.up.railway.app` with your actual Railway backend URL if it's different.

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

## Step 3: Verify Deployment

1. **Check Build Logs**:
   - Vercel will show build progress
   - Look for "Build Completed" message
   - If there are errors, check the logs

2. **Visit Your Site**:
   - After deployment, Vercel will provide a URL like: `https://recipie-hub.vercel.app`
   - Click the URL to visit your site
   - Test the application:
     - Try logging in/registering
     - Browse recipes
     - Check if API calls work

## Step 4: Custom Domain (Optional)

1. **Add Domain**:
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `recipehub.com`)
   - Follow Vercel's DNS configuration instructions

## Troubleshooting

### Issue: Build Fails

**Error**: "Module not found" or "Cannot find module"
- **Solution**: Make sure `Root Directory` is set to `frontend` in Vercel settings

**Error**: "Build script not found"
- **Solution**: The `vercel-build` script has been added to `package.json`. If it still fails, check that the build command is `npm run build`

### Issue: API Calls Fail (CORS Error)

**Error**: "Access to XMLHttpRequest blocked by CORS policy"
- **Solution**: 
  1. Check that `REACT_APP_API_URL` is set correctly in Vercel environment variables
  2. Verify your Railway backend has CORS configured to allow your Vercel domain
  3. Check Railway backend logs for CORS errors

### Issue: 404 on Page Refresh

**Error**: "404 Not Found" when refreshing a page
- **Solution**: The `vercel.json` file includes rewrite rules to handle React Router. If you still see 404s, check that `vercel.json` is in the `frontend` directory.

### Issue: Environment Variable Not Working

**Error**: API calls go to `localhost:3001` instead of Railway
- **Solution**: 
  1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
  2. Verify `REACT_APP_API_URL` is set correctly
  3. Redeploy the project (Vercel → Deployments → Redeploy)

## Environment Variables Reference

| Variable Name | Value | Required |
|--------------|-------|----------|
| `REACT_APP_API_URL` | Your Railway backend URL (e.g., `https://recipehub-backend-production.up.railway.app`) | Yes |

## Updating Your Deployment

### Automatic Deployments
- Vercel automatically deploys when you push to the `main` branch
- Each push creates a new deployment
- You can preview deployments before merging

### Manual Redeploy
1. Go to Vercel Dashboard → Your Project
2. Click "Deployments" tab
3. Click "..." on any deployment → "Redeploy"

## Next Steps

1. ✅ Frontend deployed on Vercel
2. ✅ Backend deployed on Railway
3. ✅ Environment variables configured
4. 🎉 Your RecipeHub app is live!

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/dashboard
- **Your Frontend URL**: Check Vercel project overview
- **Your Backend URL**: Check Railway service URL
