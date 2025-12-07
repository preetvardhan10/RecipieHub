# RecipeHub - Smart Recipe Sharing & Meal Planning Platform

A full-stack web application for sharing recipes, discovering new dishes, and planning meals with AI-powered suggestions.

## Features

- **User Authentication**: Sign up, login, and JWT-based authentication
- **Recipe Management**: Create, read, update, and delete recipes
- **Advanced Search**: Search recipes by name, ingredients, cuisine, and difficulty
- **Filtering & Sorting**: Filter by cuisine/difficulty, sort by rating, time, or date
- **Pagination**: Browse recipes with paginated results
- **AI-Powered Suggestions**: Get recipe suggestions based on available ingredients using OpenAI
- **Meal Planning**: Create and manage weekly meal plans
- **Ratings & Reviews**: Rate and review recipes
- **Favorites**: Save favorite recipes
- **User Profiles**: View and edit user profiles
- **Follow System**: Follow other users
- **Responsive Design**: Modern UI with TailwindCSS

## Tech Stack

### Frontend
- React.js
- React Router
- TailwindCSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- OpenAI API

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API key (optional, for AI features)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/recipehub
JWT_SECRET=your-secret-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=your-openai-api-key-here
```

4. Start MongoDB (if using local MongoDB):
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# Or use MongoDB Atlas cloud database
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
REACT_APP_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Recipes
- `GET /api/recipes` - Get all recipes (with pagination, filtering, sorting)
- `GET /api/recipes/:id` - Get recipe details
- `POST /api/recipes` - Create new recipe (authenticated)
- `PUT /api/recipes/:id` - Update recipe (owner/admin only)
- `DELETE /api/recipes/:id` - Delete recipe (owner/admin only)
- `GET /api/recipes/search` - Search recipes by ingredients
- `POST /api/recipes/:id/reviews` - Add review/rating (authenticated)
- `POST /api/recipes/:id/favorite` - Toggle favorite (authenticated)

### Meal Plans
- `GET /api/mealplans` - Get user's meal plans (authenticated)
- `POST /api/mealplans` - Create meal plan (authenticated)
- `PUT /api/mealplans/:id` - Update meal plan (owner only)
- `DELETE /api/mealplans/:id` - Delete meal plan (owner only)

### AI
- `POST /api/ai/suggest` - Get AI recipe suggestions (authenticated)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (owner/admin only)
- `POST /api/users/:id/follow` - Follow/unfollow user (authenticated)
- `GET /api/users/:id/recipes` - Get user's recipes
- `GET /api/users/:id/favorites` - Get user's favorites (authenticated)

## Project Structure

```
recipieHub/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Recipe.js
│   │   └── MealPlan.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── recipes.js
│   │   ├── mealplans.js
│   │   ├── ai.js
│   │   └── users.js
│   └── index.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.js
│       │   ├── Explore.js
│       │   ├── RecipeDetails.js
│       │   ├── MyRecipes.js
│       │   ├── MealPlanner.js
│       │   ├── Profile.js
│       │   ├── RecipeForm.js
│       │   └── AISuggestions.js
│       ├── App.js
│       ├── config.js
│       └── index.js
└── README.md
```

## Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy the backend service

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set `REACT_APP_API_URL` to your backend URL
3. Deploy the frontend

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get the connection string
4. Update `MONGODB_URI` in your backend `.env`

## Notes

- The OpenAI API key is optional. If not provided, the AI suggestions feature will show similar recipes from the database instead.
- Make sure to use a strong `JWT_SECRET` in production.
- Update `FRONTEND_URL` in production to match your deployed frontend URL.

## License

This project is part of the Newton School of Technology curriculum.

## Author

Preet Vardhan  
Enrollment No: 2401010352
