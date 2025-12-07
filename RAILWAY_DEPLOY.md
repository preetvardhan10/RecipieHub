# Deploy to Railway (Easiest Alternative!)

Railway is the easiest alternative to Render - no credit card required initially!

## Step 1: Sign Up
1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub
4. Authorize Railway to access your repos

## Step 2: Deploy Your Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose: `preetvardhan10/RecipieHub`
4. Railway will auto-detect it's a Node.js project

## Step 3: Configure Service
1. Railway creates a service automatically
2. Click on the service
3. Go to "Settings" tab
4. Set **Root Directory**: `backend`
5. **Build Command**: `npm install` (auto-set)
6. **Start Command**: `npm start` (auto-set)

## Step 4: Add Environment Variables
1. Go to "Variables" tab
2. Click "+ New Variable"
3. Add each variable:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipehub?retryWrites=true&w=majority
JWT_SECRET=+eQw9wPJNZKDwiN7LpCVbPKhh4w0ppkfB7PyGfunCRc=
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=sk-your-key-here
```

## Step 5: Deploy
1. Railway auto-deploys when you push to GitHub
2. Or click "Deploy" button
3. Wait 2-3 minutes
4. Get your URL: `https://your-service.up.railway.app`

## Step 6: Test
```bash
curl https://your-service.up.railway.app/health
```

Should return: `{"status":"OK",...}`

## Free Tier
- $5 credit/month
- No credit card required initially
- Enough for small projects

## Update Frontend
After deployment, update `frontend/src/config.js`:
```javascript
const config = {
  API_BASE_URL: 'https://your-service.up.railway.app'
};
```
