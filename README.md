# RecipeHub - Smart Recipe Sharing & Meal Planning Platform

A full-stack MERN application for sharing recipes, planning meals, and getting AI-powered recipe suggestions.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access (USER/ADMIN)
- **Recipe Management**: Full CRUD operations for recipes
- **Advanced Search & Filtering**: Filter by cuisine, difficulty, cooking time; search by name/ingredients
- **Sorting & Pagination**: Sort by rating, cooking time, date; paginated results
- **Reviews & Ratings**: Rate and review recipes
- **Meal Planning**: Create and manage weekly meal plans
- **AI Recipe Suggestions**: Get personalized recipe suggestions using OpenAI
- **Community Features**: Follow users, save favorites
- **Responsive Design**: Modern UI with Tailwind CSS

## 📋 Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- JWT Authentication

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- OpenAI API

### Database
- MongoDB Atlas (Cloud Hosted)

## 🛠️ Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- OpenAI API key

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=your-openai-api-key
FRONTEND_URL=http://localhost:5173
```

5. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/login`
Login user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Get current user (requires authentication).

### Recipe Endpoints

#### GET `/api/recipes`
Get all recipes with filtering, searching, sorting, and pagination.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 12)
- `cuisine` - Filter by cuisine
- `difficulty` - Filter by difficulty (Easy, Medium, Hard)
- `maxCookingTime` - Filter by maximum cooking time
- `search` - Search query
- `sortBy` - Sort field (rating, cookingTime, createdAt)
- `sortOrder` - Sort order (asc, desc)

#### GET `/api/recipes/:id`
Get single recipe by ID.

#### POST `/api/recipes`
Create new recipe (requires authentication).

**Request Body:**
```json
{
  "title": "Pasta Carbonara",
  "description": "Classic Italian pasta dish",
  "cuisine": "Italian",
  "difficulty": "Medium",
  "cookingTime": 30,
  "servings": 4,
  "ingredients": [
    {
      "name": "pasta",
      "quantity": "400",
      "unit": "g"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "instruction": "Boil water and cook pasta"
    }
  ]
}
```

#### PUT `/api/recipes/:id`
Update recipe (requires authentication, owner/admin only).

#### DELETE `/api/recipes/:id`
Delete recipe (requires authentication, owner/admin only).

#### POST `/api/recipes/:id/rate`
Rate a recipe (requires authentication).

**Request Body:**
```json
{
  "rating": 5
}
```

#### POST `/api/recipes/:id/favorite`
Toggle favorite status (requires authentication).

### Review Endpoints

#### POST `/api/reviews`
Create a review (requires authentication).

**Request Body:**
```json
{
  "recipeId": "recipe-id",
  "rating": 5,
  "comment": "Great recipe!"
}
```

#### GET `/api/reviews/recipe/:recipeId`
Get reviews for a recipe.

### Meal Plan Endpoints

#### POST `/api/mealplans`
Create meal plan (requires authentication).

#### GET `/api/mealplans`
Get user's meal plans (requires authentication).

#### GET `/api/mealplans/:id`
Get single meal plan (requires authentication).

#### PUT `/api/mealplans/:id`
Update meal plan (requires authentication, owner only).

#### DELETE `/api/mealplans/:id`
Delete meal plan (requires authentication, owner only).

### AI Endpoints

#### POST `/api/ai/suggest`
Get AI recipe suggestions (requires authentication).

**Request Body:**
```json
{
  "ingredients": ["chicken", "tomatoes", "onions"],
  "dietaryPreferences": "vegetarian"
}
```

### User Endpoints

#### GET `/api/users/:id`
Get user profile.

#### GET `/api/users/:id/recipes`
Get user's recipes.

#### POST `/api/users/:id/follow`
Follow/Unfollow user (requires authentication).

#### PUT `/api/users/profile`
Update user profile (requires authentication).

#### GET `/api/users/favorites/list`
Get user's favorite recipes (requires authentication).

## 🚢 Deployment

### Backend Deployment (Render)

1. Push your code to GitHub
2. Go to [Render](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
6. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `OPENAI_API_KEY`
   - `FRONTEND_URL` (your Vercel URL)
   - `NODE_ENV=production`
   - `PORT=10000`

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
5. Add environment variable:
   - `VITE_API_URL` (your Render backend URL + `/api`)

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation with express-validator
- Protected routes with middleware
- Role-based access control
- CORS configuration
- Error handling middleware

## 📝 Project Structure

```
recipehub/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   └── public/
└── README.md
```

## 🧪 Testing the API

You can test the API using Postman or any HTTP client. Make sure to:

1. Start the backend server
2. Register a new user at `POST /api/auth/signup`
3. Login at `POST /api/auth/login` to get a token
4. Use the token in the Authorization header: `Bearer <token>`
5. Test other endpoints

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue on GitHub.

---

Built with ❤️ using the MERN stack

