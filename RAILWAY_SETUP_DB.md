# 🗄️ Setup Database on Railway - Quick Guide

Your database needs migrations and seed data. Follow these steps:

## Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

## Step 2: Login to Railway

```bash
railway login
```

## Step 3: Link to Your Project

```bash
cd backend
railway link
```

Select your Railway project when prompted.

## Step 4: Run Migrations

This creates all the database tables:

```bash
railway run npm run prisma:deploy
```

Wait for it to complete. You should see:
```
✅ Applied migration: 20241118112219_init
```

## Step 5: Seed the Database

This adds sample recipes and users:

```bash
railway run npm run seed
```

You should see:
```
🌱 Starting database seed...
👥 Creating users...
🍳 Creating recipes...
✅ Database seeded successfully!
```

## Step 6: Verify

Test your backend:
```
https://your-railway-url.up.railway.app/api/recipes
```

Should return a list of recipes!

---

## Alternative: Using Railway Web Interface

If CLI doesn't work:

1. Go to Railway Dashboard → Your Service
2. Click "Deployments" tab
3. Click on latest deployment
4. Click "View Logs"
5. Look for "Open Shell" or "Terminal" button
6. Run:
   ```bash
   cd backend
   npm run prisma:deploy
   npm run seed
   ```

---

## Troubleshooting

**Error: "Migration already applied"**
- That's fine! Just run the seed command.

**Error: "Cannot connect to database"**
- Check `DATABASE_URL` in Railway Variables
- Verify your Neon DB is running

**Error: "Prisma Client not generated"**
- Run: `railway run npm run prisma:generate`

---

**After running these commands, your database will have data and the frontend should work!** 🎉

