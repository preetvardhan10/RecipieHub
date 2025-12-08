# Environment Variables Setup

## Required Environment Variables

Your `.env` file in the `backend/` directory needs the following variables:

### Database Configuration

**IMPORTANT:** You need `DATABASE_URL` (not `MONGODB_URI`) for PostgreSQL.

```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

**Example (Neon DB):**
```env
DATABASE_URL=postgresql://neondb_owner:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Server Configuration

```env
NODE_ENV=development
PORT=5001
```

### Authentication

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

### Frontend URL (for CORS)

```env
FRONTEND_URL=http://localhost:5173
```

### OpenAI API (Optional)

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

**Note:** If `OPENAI_API_KEY` is not provided, the AI suggestions will use a fallback generator.

## Complete .env Example

```env
# Server
NODE_ENV=development
PORT=5001

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=http://localhost:5173

# OpenAI (Optional)
OPENAI_API_KEY=sk-your-openai-api-key-here
```

## Migration from MongoDB

If you have `MONGODB_URI` in your `.env` file, **replace it with `DATABASE_URL`** pointing to your PostgreSQL database.

## Getting a PostgreSQL Database

### Option 1: Neon DB (Recommended - Free Tier)

1. Go to https://neon.tech
2. Sign up for free
3. Create a new project
4. Copy the connection string
5. Add it to `.env` as `DATABASE_URL`

### Option 2: Supabase

1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Add it to `.env` as `DATABASE_URL`

### Option 3: Local PostgreSQL

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/recipehub
```

## Troubleshooting

### Error: "DATABASE_URL environment variable is not set"

**Solution:** Add `DATABASE_URL` to your `backend/.env` file.

### Error: "Environment variable not found: DATABASE_URL"

**Solution:** 
1. Make sure `.env` file is in the `backend/` directory
2. Check that `DATABASE_URL` is spelled correctly (no typos)
3. Restart your server after adding `DATABASE_URL`

### Error: Connection refused

**Solution:**
1. Verify your database is running (if local)
2. Check your connection string is correct
3. Verify network access (for cloud databases, check IP whitelist)

