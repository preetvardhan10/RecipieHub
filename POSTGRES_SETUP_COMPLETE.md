# ✅ PostgreSQL Migration Complete!

## What's Been Done

✅ **Database**: Migrated from MongoDB to PostgreSQL  
✅ **ORM**: Switched from Mongoose to Sequelize  
✅ **Models**: All models converted (User, Recipe, Review, MealPlan)  
✅ **Routes**: All routes updated to use Sequelize syntax:
  - `/api/auth` - Authentication routes
  - `/api/recipes` - Recipe CRUD operations
  - `/api/users` - User profiles and following
  - `/api/mealplans` - Meal planning
  - `/api/ai` - AI suggestions

## Next Steps: Set Up PostgreSQL on Railway

### 1. Add PostgreSQL Service

1. Go to Railway Dashboard
2. Click "+ New" → "Database" → "Add PostgreSQL"
3. Railway will create a PostgreSQL instance automatically

### 2. Get Connection String

1. Click on the PostgreSQL service
2. Go to "Variables" tab
3. Copy the `DATABASE_URL` value
   - Format: `postgres://user:password@host:port/database`

### 3. Update Backend Service Variables

1. Go to `recipehub-backend` → "Variables" tab
2. **Remove**:
   - `MONGO_URL`
   - `MONGODB_URI`
3. **Add**:
   - **Name**: `DATABASE_URL`
   - **Value**: Paste the PostgreSQL connection string from step 2
4. Click "Save"

### 4. Deploy

Railway will automatically redeploy. Check the logs:
- ✅ Should see: "PostgreSQL Connected"
- ✅ Should see: "Database models synced" (development)
- ❌ Should NOT see: MongoDB connection errors

## Testing

After deployment:

1. **Check Health**:
   ```
   GET https://recipehub-backend-production.up.railway.app/health
   ```
   Should return: `{"status":"OK",...}`

2. **Test Signup**:
   ```
   POST https://recipehub-backend-production.up.railway.app/api/auth/signup
   Body: { "name": "Test", "email": "test@example.com", "password": "password123" }
   ```

3. **Check Database Tables**:
   - Tables should be created automatically on first connection
   - In development, tables are synced automatically
   - In production, you may need to run migrations manually

## Key Changes Made

### Models
- `User` - Now uses Sequelize with bcrypt hooks
- `Recipe` - Ingredients stored as JSONB, instructions as array
- `Review` - Separate table (not embedded)
- `MealPlan` - Meals stored as JSONB

### Routes
- All `findOne({ field })` → `findOne({ where: { field } })`
- All `findById()` → `findByPk()`
- All `new Model()` + `save()` → `Model.create()`
- All `_id` → `id`
- All `populate()` → `include`
- All `countDocuments()` → `count()`

### Associations
- User ↔ Recipe (author relationship)
- Recipe ↔ Review (one-to-many)
- User ↔ User (followers/following via join table)
- User ↔ Recipe (favorites via join table)

## Environment Variables

**Required:**
- `DATABASE_URL` - PostgreSQL connection string

**Optional:**
- `POSTGRES_URL` - Alternative to DATABASE_URL
- `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DATABASE`, `POSTGRES_USER`, `POSTGRES_PASSWORD` - Individual connection parts

**Other (unchanged):**
- `JWT_SECRET`
- `FRONTEND_URL`
- `OPENAI_API_KEY` (optional)
- `NODE_ENV`

## Troubleshooting

### "PostgreSQL connection error"
- Check `DATABASE_URL` is set correctly
- Verify PostgreSQL service is "Online" in Railway
- Check connection string format

### "Table does not exist"
- In development: Tables auto-sync on startup
- In production: May need to run migrations
- Check logs for sync errors

### Routes returning errors
- Verify all models are properly imported
- Check Sequelize associations are set up
- Review error logs for specific issues

## Notes

- The seed script (`seed.js`) still needs to be updated for PostgreSQL (optional)
- Database tables are created automatically on first connection
- In production, consider using migrations instead of auto-sync
