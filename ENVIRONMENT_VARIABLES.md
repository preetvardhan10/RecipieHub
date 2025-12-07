# Environment Variables for RecipeHub Backend

## Required Environment Variables for Render Deployment

### 1. NODE_ENV
**Purpose**: Sets the application environment mode  
**Value**: `production`  
**Required**: Yes  
**Example**:
```
NODE_ENV=production
```

### 2. PORT
**Purpose**: Server port (Render sets this automatically, but you can override)  
**Value**: `10000` (Render's default) or leave Render to set it automatically  
**Required**: No (Render provides this automatically)  
**Note**: Your code uses `process.env.PORT || 3001`, so this is optional  
**Example**:
```
PORT=10000
```

### 3. MONGODB_URI
**Purpose**: MongoDB database connection string  
**Value**: Your MongoDB Atlas connection string  
**Required**: Yes  
**Format**: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`  
**How to get**:
1. Go to MongoDB Atlas → Clusters
2. Click "Connect" → "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `recipehub` (or your database name)

**Example**:
```
MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.xxxxx.mongodb.net/recipehub?retryWrites=true&w=majority
```

**Important Notes**:
- If password contains special characters, URL-encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `%` → `%25`
  - `&` → `%26`
  - `+` → `%2B`
- Ensure MongoDB Atlas Network Access allows `0.0.0.0/0` (all IPs)

### 4. JWT_SECRET
**Purpose**: Secret key for signing and verifying JWT tokens  
**Value**: A long, random, secure string (minimum 32 characters)  
**Required**: Yes  
**How to generate**:
```bash
openssl rand -base64 32
```
Or use any random string generator (minimum 32 characters)

**Example**:
```
JWT_SECRET=your-super-secret-key-minimum-32-characters-long-random-string-here
```

**Security Note**: Keep this secret! Never commit it to Git.

### 5. FRONTEND_URL
**Purpose**: Frontend URL for CORS (Cross-Origin Resource Sharing) configuration  
**Value**: Your frontend application URL  
**Required**: Yes  
**For Development**:
```
FRONTEND_URL=http://localhost:3000
```

**For Production** (when frontend is deployed):
```
FRONTEND_URL=https://your-frontend-domain.com
```

**For Multiple Origins** (if needed, you'll need to update CORS config in code):
```
FRONTEND_URL=https://your-frontend.com,https://www.your-frontend.com
```

### 6. OPENAI_API_KEY (Optional but Recommended)
**Purpose**: OpenAI API key for AI recipe suggestions feature  
**Value**: Your OpenAI API key (starts with `sk-`)  
**Required**: No (only if you want AI suggestions to work)  
**How to get**:
1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

**Example**:
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Note**: If not set, AI suggestions will fall back to showing similar recipes from database.

---

## Complete Environment Variables List for Render

Copy and paste these into Render Dashboard → Environment Variables:

### Minimum Required (Service will work):
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipehub?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-minimum-32-characters-long
FRONTEND_URL=http://localhost:3000
```

### Recommended (Full functionality):
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipehub?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-minimum-32-characters-long
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Optional (Render sets automatically):
```
PORT=10000
```

---

## Step-by-Step: Adding to Render

1. **Go to Render Dashboard**
   - Navigate to your web service
   - Click on the service name

2. **Open Environment Tab**
   - Click "Environment" in the left sidebar
   - Or scroll to "Environment Variables" section

3. **Add Each Variable**
   - Click "+ Add Environment Variable"
   - Enter Key (e.g., `NODE_ENV`)
   - Enter Value (e.g., `production`)
   - Click "Save Changes"
   - Repeat for each variable

4. **Verify All Variables**
   - Check that all required variables are listed
   - Values are masked with `**********` for security

5. **Redeploy**
   - After adding variables, Render will auto-redeploy
   - Or click "Manual Deploy" → "Deploy latest commit"

---

## Environment Variable Checklist

Before deploying, ensure you have:

- [ ] `NODE_ENV` = `production`
- [ ] `MONGODB_URI` = Your MongoDB connection string
- [ ] `JWT_SECRET` = Generated secure random string (32+ chars)
- [ ] `FRONTEND_URL` = Your frontend URL
- [ ] `OPENAI_API_KEY` = Your OpenAI key (optional)

---

## Testing Environment Variables

After deployment, test if variables are set correctly:

```bash
# Test health endpoint
curl https://your-service.onrender.com/health

# Should return:
# {"status":"OK","timestamp":"...","environment":"production"}
```

If `environment` shows `production`, then `NODE_ENV` is set correctly.

---

## Common Mistakes

1. **Missing quotes**: Don't add quotes around values in Render
   - ❌ Wrong: `MONGODB_URI="mongodb+srv://..."`
   - ✅ Correct: `MONGODB_URI=mongodb+srv://...`

2. **Extra spaces**: No spaces around `=`
   - ❌ Wrong: `NODE_ENV = production`
   - ✅ Correct: `NODE_ENV=production`

3. **Special characters in MongoDB password**: Must be URL-encoded
   - If password is `my@pass#123`
   - Use: `my%40pass%23123`

4. **JWT_SECRET too short**: Must be at least 32 characters
   - Generate with: `openssl rand -base64 32`

---

## Quick Reference

| Variable | Required | Example Value |
|----------|----------|---------------|
| `NODE_ENV` | ✅ Yes | `production` |
| `MONGODB_URI` | ✅ Yes | `mongodb+srv://user:pass@cluster.mongodb.net/recipehub` |
| `JWT_SECRET` | ✅ Yes | `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` (32+ chars) |
| `FRONTEND_URL` | ✅ Yes | `http://localhost:3000` |
| `OPENAI_API_KEY` | ⚠️ Optional | `sk-proj-...` |
| `PORT` | ❌ No | `10000` (Render sets automatically) |
