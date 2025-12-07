# Deployment Guide for RecipeHub Backend on Render

## Prerequisites
1. A Render account (sign up at https://render.com)
2. A MongoDB database (MongoDB Atlas free tier recommended)
3. An OpenAI API key (for AI suggestions feature)

## Step 1: Set up MongoDB Atlas (if not already done)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist IP addresses (use `0.0.0.0/0` for Render)
5. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/recipehub?retryWrites=true&w=majority`)

## Step 2: Deploy on Render

### Option A: Using Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Connect your GitHub repository: `https://github.com/preetvardhan10/RecipieHub.git`
   - Select the repository

3. **Configure Service**
   - **Name**: `recipehub-backend` (or any name you prefer)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Set Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_very_secure_random_secret_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   FRONTEND_URL=https://your-frontend-url.com
   ```

   **Important Notes:**
   - Replace `your_mongodb_connection_string_here` with your actual MongoDB Atlas connection string
   - Generate a secure `JWT_SECRET` (you can use: `openssl rand -base64 32`)
   - Get your OpenAI API key from https://platform.openai.com/api-keys
   - Set `FRONTEND_URL` to your frontend URL (or `http://localhost:3000` for local development)

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend
   - Wait for deployment to complete (usually 2-5 minutes)

6. **Get Your Backend URL**
   - Once deployed, you'll get a URL like: `https://recipehub-backend.onrender.com`
   - This is your backend API URL

### Option B: Using Render CLI

1. **Install Render CLI**
   ```bash
   npm install -g render-cli
   ```

2. **Login to Render**
   ```bash
   render login
   ```

3. **Deploy from backend directory**
   ```bash
   cd backend
   render deploy
   ```

## Step 3: Update Frontend Configuration

After deployment, update your frontend to use the new backend URL:

1. Update `frontend/src/config.js`:
   ```javascript
   const config = {
     API_BASE_URL: process.env.REACT_APP_API_URL || 'https://your-backend-url.onrender.com'
   };
   ```

2. Or set environment variable when building:
   ```bash
   REACT_APP_API_URL=https://your-backend-url.onrender.com npm run build
   ```

## Step 4: Test Your Deployment

1. **Health Check**
   ```bash
   curl https://your-backend-url.onrender.com/health
   ```
   Should return: `{"status":"OK","timestamp":"..."}`

2. **Root Endpoint**
   ```bash
   curl https://your-backend-url.onrender.com/
   ```
   Should return: `{"message":"Recipe Hub API is running!"}`

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (Render sets this automatically) | `10000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/recipehub` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key-here` |
| `OPENAI_API_KEY` | OpenAI API key for AI suggestions | `sk-...` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-frontend.com` |

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that `package.json` has correct `start` script
   - Ensure all dependencies are listed in `package.json`

2. **Database Connection Error**
   - Verify MongoDB Atlas IP whitelist includes Render IPs
   - Check connection string format
   - Ensure database user has correct permissions

3. **CORS Errors**
   - Update `FRONTEND_URL` environment variable
   - Check backend CORS configuration in `index.js`

4. **Service Keeps Restarting**
   - Check Render logs for errors
   - Verify all environment variables are set
   - Ensure MongoDB connection is working

### Viewing Logs

1. Go to Render Dashboard
2. Select your service
3. Click "Logs" tab
4. View real-time logs

## Render Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- 750 hours/month free (enough for always-on service)
- Consider upgrading for production use

## Next Steps

1. Set up a MongoDB database (if not done)
2. Configure environment variables
3. Deploy backend
4. Update frontend to use new backend URL
5. Test all endpoints
6. (Optional) Set up custom domain

## Useful Commands

```bash
# Generate a secure JWT secret
openssl rand -base64 32

# Test backend health
curl https://your-backend-url.onrender.com/health

# Test API endpoint
curl https://your-backend-url.onrender.com/api/recipes?limit=5
```
