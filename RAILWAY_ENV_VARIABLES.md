# Add Environment Variables in Railway

You're on the Variables tab - perfect! Now add the missing variables.

## Current Status:
✅ `NODE_ENV=production` - Already added!

## Missing Variables (Add These):

### Click "+ New Variable" and add each one:

**Variable 1:**
- Key: `MONGODB_URI`
- Value: `mongodb+srv://your-username:your-password@cluster.mongodb.net/recipehub?retryWrites=true&w=majority`
- Replace `your-username` and `your-password` with your actual MongoDB credentials

**Variable 2:**
- Key: `JWT_SECRET`
- Value: `+eQw9wPJNZKDwiN7LpCVbPKhh4w0ppkfB7PyGfunCRc=`
- (Or generate a new one with: `openssl rand -base64 32`)

**Variable 3:**
- Key: `FRONTEND_URL`
- Value: `http://localhost:3000`
- (Or your frontend URL if deployed)

**Variable 4 (Optional):**
- Key: `OPENAI_API_KEY`
- Value: `sk-your-openai-api-key-here`
- (Only if you want AI suggestions to work)

## Quick Copy-Paste:

After clicking "+ New Variable", paste these:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipehub?retryWrites=true&w=majority
JWT_SECRET=+eQw9wPJNZKDwiN7LpCVbPKhh4w0ppkfB7PyGfunCRc=
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=sk-your-key-here
```

**Remember**: Replace the MongoDB credentials with your actual values!

## After Adding Variables:

1. Railway will auto-redeploy
2. Go to "Deployments" tab
3. Watch the new build
4. Should succeed now!

## Also Check Settings:

While you're in Railway, also check:
1. Go to "Settings" tab
2. Verify **Root Directory** is set to: `backend`
3. If not, set it and save
