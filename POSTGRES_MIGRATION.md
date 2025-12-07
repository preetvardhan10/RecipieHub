# PostgreSQL Migration Guide

## What Changed

✅ **Database**: MongoDB → PostgreSQL  
✅ **ORM**: Mongoose → Sequelize  
✅ **Models**: Converted to Sequelize  
✅ **Database Connection**: Updated for PostgreSQL  

## Environment Variables

Update your Railway variables:

**Remove:**
- `MONGO_URL`
- `MONGODB_URI`

**Add:**
- `DATABASE_URL` (Railway PostgreSQL default)
  OR
- `POSTGRES_URL` (alternative)
  OR individual variables:
  - `POSTGRES_HOST`
  - `POSTGRES_PORT` (default: 5432)
  - `POSTGRES_DATABASE` (default: recipehub)
  - `POSTGRES_USER`
  - `POSTGRES_PASSWORD`

## Railway Setup

1. **Add PostgreSQL Service**:
   - Railway Dashboard → "+ New" → "Database" → "Add PostgreSQL"
   - Railway will create a PostgreSQL instance

2. **Get Connection String**:
   - Click on PostgreSQL service → "Variables" tab
   - Copy `DATABASE_URL` or `POSTGRES_URL`

3. **Add to Backend Service**:
   - Go to `recipehub-backend` → "Variables"
   - Add `DATABASE_URL` with the PostgreSQL connection string
   - Remove `MONGO_URL` and `MONGODB_URI`

## Key Syntax Changes

### Mongoose → Sequelize

**Finding:**
```javascript
// Mongoose
User.findOne({ email })
Recipe.findById(id)

// Sequelize
User.findOne({ where: { email } })
Recipe.findByPk(id)
```

**Creating:**
```javascript
// Mongoose
const user = new User({ name, email, password });
await user.save();

// Sequelize
const user = await User.create({ name, email, password });
```

**Updating:**
```javascript
// Mongoose
user.name = 'New Name';
await user.save();

// Sequelize
await user.update({ name: 'New Name' });
// OR
user.name = 'New Name';
await user.save();
```

**IDs:**
```javascript
// Mongoose
user._id

// Sequelize
user.id
```

**Populate/Include:**
```javascript
// Mongoose
Recipe.findById(id).populate('author')

// Sequelize
Recipe.findByPk(id, { include: [{ model: User, as: 'author' }] })
```

## Next Steps

The models are converted, but routes need updating. The main changes needed:

1. Replace `findOne({ field: value })` with `findOne({ where: { field: value } })`
2. Replace `new Model()` + `save()` with `Model.create()`
3. Replace `_id` with `id`
4. Replace `populate()` with `include`
5. Update query syntax for arrays/JSON fields

## Testing

After deployment:
1. Check logs for "PostgreSQL Connected"
2. Test `/health` endpoint
3. Try creating a user via `/api/auth/signup`
4. Check database tables are created
