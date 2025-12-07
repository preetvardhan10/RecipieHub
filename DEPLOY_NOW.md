# Deploy to Render - CLI Method (WORKING SOLUTION)

Since the web button isn't working, use Render CLI:

## Step 1: Login to Render
```bash
render login
```
This will open your browser for authentication. Complete the login.

## Step 2: Navigate to Backend
```bash
cd /Users/preetvardhan/Downloads/recipieHub/backend
```

## Step 3: Create the Service
```bash
render services:create \
  --name recipehub-backend \
  --type web \
  --env node \
  --region oregon \
  --plan free \
  --build-command "npm install" \
  --start-command "npm start" \
  --root-dir backend \
  --repo https://github.com/preetvardhan10/RecipieHub.git \
  --branch main
```

## Step 4: Set Environment Variables
After the service is created, set each variable:

```bash
# Set NODE_ENV
render env:set NODE_ENV=production --service recipehub-backend

# Set MONGODB_URI (replace with your actual connection string)
render env:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/recipehub?retryWrites=true&w=majority" --service recipehub-backend

# Set JWT_SECRET
render env:set JWT_SECRET="+eQw9wPJNZKDwiN7LpCVbPKhh4w0ppkfB7PyGfunCRc=" --service recipehub-backend

# Set FRONTEND_URL
render env:set FRONTEND_URL="http://localhost:3000" --service recipehub-backend

# Set OPENAI_API_KEY (optional)
render env:set OPENAI_API_KEY="sk-your-key-here" --service recipehub-backend
```

## Step 5: Deploy
The service will auto-deploy after creation. Check status:
```bash
render services:list
```

## Alternative: Use Blueprint (render.yaml)

I've created a `render.yaml` file in your root directory. You can also:

1. Push it to GitHub:
```bash
git add render.yaml
git commit -m "Add Render blueprint"
git push origin main
```

2. In Render Dashboard:
   - Go to "New +" → "Blueprint"
   - Connect your repo
   - Render will auto-detect render.yaml
   - Click "Apply"
