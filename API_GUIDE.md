# API Testing Guide

This guide will help you test all RecipeHub API endpoints.

## Base URL

- **Local**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url.onrender.com/api`

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Testing with Postman

### 1. User Registration

**POST** `/api/auth/signup`

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "...",
      "username": "testuser",
      "email": "test@example.com",
      "role": "USER"
    }
  }
}
```

**Save the token for subsequent requests!**

### 2. User Login

**POST** `/api/auth/login`

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:** Same format as signup

### 3. Get Current User

**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

### 4. Get All Recipes (with filters)

**GET** `/api/recipes?page=1&limit=12&cuisine=Italian&difficulty=Easy&sortBy=rating&sortOrder=desc`

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 12)
- `cuisine` - Filter by cuisine
- `difficulty` - Easy, Medium, or Hard
- `maxCookingTime` - Maximum cooking time in minutes
- `search` - Search query
- `sortBy` - rating, cookingTime, or createdAt
- `sortOrder` - asc or desc

### 5. Get Single Recipe

**GET** `/api/recipes/:id`

Replace `:id` with actual recipe ID.

### 6. Create Recipe

**POST** `/api/recipes`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "title": "Spaghetti Carbonara",
  "description": "Classic Italian pasta dish with eggs, cheese, and bacon",
  "cuisine": "Italian",
  "difficulty": "Medium",
  "cookingTime": 30,
  "servings": 4,
  "image": "https://example.com/image.jpg",
  "ingredients": [
    {
      "name": "spaghetti",
      "quantity": "400",
      "unit": "g"
    },
    {
      "name": "eggs",
      "quantity": "4",
      "unit": ""
    },
    {
      "name": "bacon",
      "quantity": "200",
      "unit": "g"
    },
    {
      "name": "parmesan cheese",
      "quantity": "100",
      "unit": "g"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "instruction": "Cook spaghetti according to package directions"
    },
    {
      "step": 2,
      "instruction": "Fry bacon until crispy"
    },
    {
      "step": 3,
      "instruction": "Mix eggs and cheese in a bowl"
    },
    {
      "step": 4,
      "instruction": "Combine pasta with bacon, then mix in egg mixture off heat"
    }
  ],
  "tags": ["pasta", "italian", "quick"]
}
```

### 7. Update Recipe

**PUT** `/api/recipes/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:** Same format as create, but only include fields to update.

**Note:** Only the recipe owner or admin can update.

### 8. Delete Recipe

**DELETE** `/api/recipes/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Note:** Only the recipe owner or admin can delete.

### 9. Rate Recipe

**POST** `/api/recipes/:id/rate`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "rating": 5
}
```

Rating must be between 1 and 5.

### 10. Toggle Favorite

**POST** `/api/recipes/:id/favorite`

**Headers:**
```
Authorization: Bearer <token>
```

### 11. Search Recipes

**GET** `/api/recipes/search?q=pasta&page=1&limit=12`

### 12. Create Review

**POST** `/api/reviews`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "recipeId": "recipe-id-here",
  "rating": 5,
  "comment": "This recipe is amazing! Highly recommend."
}
```

### 13. Get Recipe Reviews

**GET** `/api/reviews/recipe/:recipeId?page=1&limit=10`

### 14. Create Meal Plan

**POST** `/api/mealplans`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Week 1 Meal Plan",
  "description": "Healthy meals for the week",
  "startDate": "2024-01-01",
  "endDate": "2024-01-07",
  "meals": [
    {
      "date": "2024-01-01",
      "mealType": "Breakfast",
      "recipe": "recipe-id-1"
    },
    {
      "date": "2024-01-01",
      "mealType": "Lunch",
      "recipe": "recipe-id-2"
    },
    {
      "date": "2024-01-01",
      "mealType": "Dinner",
      "recipe": "recipe-id-3"
    }
  ]
}
```

### 15. Get Meal Plans

**GET** `/api/mealplans?page=1&limit=10`

**Headers:**
```
Authorization: Bearer <token>
```

### 16. Get AI Suggestions

**POST** `/api/ai/suggest`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "ingredients": ["chicken", "tomatoes", "onions", "garlic"],
  "dietaryPreferences": "gluten-free"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe suggestions generated successfully",
  "data": {
    "recipes": [
      {
        "title": "Chicken Tomato Stew",
        "description": "...",
        "ingredients": [...],
        "instructions": [...],
        "cuisine": "Mediterranean",
        "difficulty": "Easy",
        "cookingTime": 45,
        "servings": 4
      }
    ]
  }
}
```

### 17. Get User Profile

**GET** `/api/users/:userId`

### 18. Get User Recipes

**GET** `/api/users/:userId/recipes?page=1&limit=12`

### 19. Follow/Unfollow User

**POST** `/api/users/:userId/follow`

**Headers:**
```
Authorization: Bearer <token>
```

### 20. Update Profile

**PUT** `/api/users/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "username": "newusername",
  "bio": "Updated bio",
  "avatar": "https://example.com/avatar.jpg"
}
```

### 21. Get Favorites

**GET** `/api/users/favorites/list`

**Headers:**
```
Authorization: Bearer <token>
```

## Testing Workflow

1. **Register/Login** to get a token
2. **Create a recipe** to test POST endpoint
3. **Get recipes** to test GET with filters
4. **Rate the recipe** to test rating system
5. **Create a review** to test review system
6. **Create a meal plan** to test meal planning
7. **Get AI suggestions** to test AI integration
8. **Update profile** to test user management

## Common Issues

### 401 Unauthorized
- Token is missing or invalid
- Token has expired
- Check Authorization header format

### 403 Forbidden
- User doesn't have permission
- Not the owner/admin for protected resources

### 404 Not Found
- Resource doesn't exist
- Check the ID is correct

### 400 Bad Request
- Validation error
- Check request body format
- Check required fields are present

### 500 Internal Server Error
- Server error
- Check server logs
- Verify database connection

## Postman Collection

You can create a Postman collection with:
1. Environment variables for base URL and token
2. Pre-request scripts to set Authorization header
3. Tests to save tokens automatically

Example Pre-request Script:
```javascript
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('token')
});
```

## cURL Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Create Recipe
```bash
curl -X POST http://localhost:5000/api/recipes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Recipe",
    "description": "Test description",
    "cuisine": "Italian",
    "difficulty": "Easy",
    "cookingTime": 30,
    "servings": 4,
    "ingredients": [{"name": "test", "quantity": "1", "unit": "cup"}],
    "instructions": [{"step": 1, "instruction": "Test step"}]
  }'
```

