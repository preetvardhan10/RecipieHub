# Deploy Using Render Blueprint (WORKING METHOD)

Since the web interface button isn't working, use the Blueprint method with render.yaml:

## Step 1: Push render.yaml to GitHub

```bash
cd /Users/preetvardhan/Downloads/recipieHub
git add render.yaml
git commit -m "Add Render blueprint configuration"
git push origin main
```

## Step 2: Create Blueprint in Render

1. **Go to Render Dashboard**
   - https://dashboard.render.com

2. **Click "New +" → "Blueprint"**
   - (Not "Web Service", but "Blueprint")

3. **Connect Repository**
   - Select: `preetvardhan10/RecipieHub`
   - Branch: `main`

4. **Render will auto-detect render.yaml**
   - It will show your service configuration
   - Review the settings

5. **Set Environment Variables**
   - Click on the service in the preview
   - Add environment variables:
     - `NODE_ENV=production`
     - `MONGODB_URI=your-connection-string`
     - `JWT_SECRET=your-secret-key`
     - `FRONTEND_URL=http://localhost:3000`
     - `OPENAI_API_KEY=your-key` (optional)

6. **Click "Apply"**
   - Render will create and deploy your service

## Step 3: Wait for Deployment

- Go to your service in Render Dashboard
- Click "Logs" to watch the deployment
- Should see: "Server running on port..."

## Why This Works

Blueprints use the `render.yaml` file which has all your configuration.
This bypasses the web form that's having issues.
