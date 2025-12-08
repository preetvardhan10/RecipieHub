# RecipeHub Backend API

Backend API for RecipeHub - A Smart Recipe Sharing & Meal Planning Platform

## Tech Stack

- **Node.js** with Express.js
- **PostgreSQL** database
- **Prisma** ORM
- **JWT** for authentication
- **OpenAI API** for AI recipe suggestions (with fallback)

## Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database (Neon DB, Supabase, or local PostgreSQL)
- npm or yarn

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd selfrecipe/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   NODE_ENV=development
   PORT=5001
   DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=7d
   OPENAI_API_KEY=sk-your-key (optional)
   FRONTEND_URL=http://localhost:5173
   ```

4. **Set up Prisma**
   ```bash
   # Generate Prisma Client
   npm run prisma:generate
   
   # Push schema to database (development)
   npm run prisma:push
   
   # Or run migrations (production)
   npm run prisma:migrate
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5001`

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/recipes` - Get all recipes (with filters, search, pagination)
- `POST /api/recipes` - Create a recipe (authenticated)
- `GET /api/recipes/:id` - Get recipe details
- `PUT /api/recipes/:id` - Update recipe (owner only)
- `DELETE /api/recipes/:id` - Delete recipe (owner only)
- `POST /api/recipes/:id/rate` - Rate a recipe
- `POST /api/recipes/:id/favorite` - Favorite a recipe
- `GET /api/mealplans` - Get user's meal plans
- `POST /api/mealplans` - Create meal plan
- `POST /api/ai/suggest` - Get AI recipe suggestions

See `API_GUIDE.md` for complete API documentation.

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:push` - Push schema to database (development)
- `npm run prisma:deploy` - Deploy migrations (production)
- `npm run prisma:studio` - Open Prisma Studio
- `npm run seed` - Seed database with sample data

## Deployment

See `../DEPLOYMENT.md` for detailed deployment instructions.

### Quick Deploy to Render

1. Push code to GitHub
2. Create a new Web Service in Render
3. Connect your GitHub repository
4. Set Root Directory to `backend`
5. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `OPENAI_API_KEY` (optional)
6. Build Command: `npm install && npm run prisma:generate`
7. Start Command: `npm start`

Or use the `render.yaml` file for automatic configuration.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRES_IN` | JWT expiration time | Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI suggestions | No |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── recipeController.js  # Recipe CRUD operations
│   ├── reviewController.js  # Review operations
│   ├── mealPlanController.js # Meal plan operations
│   ├── aiController.js      # AI suggestions
│   └── userController.js    # User operations
├── middlewares/
│   ├── auth.js              # JWT authentication
│   ├── errorHandler.js      # Error handling
│   └── validator.js         # Input validation
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.js              # Database seeding
│   └── client.js           # Prisma client
├── routes/
│   ├── authRoutes.js        # Auth routes
│   ├── recipeRoutes.js      # Recipe routes
│   ├── reviewRoutes.js      # Review routes
│   ├── mealPlanRoutes.js    # Meal plan routes
│   ├── aiRoutes.js          # AI routes
│   └── userRoutes.js        # User routes
├── utils/
│   └── generateToken.js     # JWT token generation
├── server.js                # Express server
└── package.json             # Dependencies
```

## License

ISC

