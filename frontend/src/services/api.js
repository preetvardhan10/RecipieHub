import axios from 'axios';

// Get API URL and ensure it ends with /api
let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Ensure API_URL ends with /api
if (!API_URL.endsWith('/api')) {
  API_URL = API_URL.endsWith('/') ? `${API_URL}api` : `${API_URL}/api`;
}

// Log API URL for debugging (always log in production to help debug)
console.log('🔗 API URL:', API_URL);
console.log('🔗 VITE_API_URL env:', import.meta.env.VITE_API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error details for debugging
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullURL: error.config?.baseURL + error.config?.url,
      code: error.code,
    };
    
    console.error('❌ API Error:', errorDetails);
    
    // Network errors (CORS, connection refused, etc.)
    if (!error.response) {
      console.error('🌐 Network Error Details:', {
        message: error.message,
        code: error.code,
        fullURL: error.config?.baseURL + error.config?.url,
        suggestion: 'Check if backend is running and CORS is configured correctly'
      });
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Recipe API
export const recipeAPI = {
  getRecipes: (params) => api.get('/recipes', { params }),
  getRecipe: (id) => api.get(`/recipes/${id}`),
  createRecipe: (data) => api.post('/recipes', data),
  updateRecipe: (id, data) => api.put(`/recipes/${id}`, data),
  deleteRecipe: (id) => api.delete(`/recipes/${id}`),
  rateRecipe: (id, rating) => api.post(`/recipes/${id}/rate`, { rating }),
  toggleFavorite: (id) => api.post(`/recipes/${id}/favorite`),
  searchRecipes: (params) => api.get('/recipes/search', { params }),
};

// Review API
export const reviewAPI = {
  createReview: (data) => api.post('/reviews', data),
  getRecipeReviews: (recipeId, params) => api.get(`/reviews/recipe/${recipeId}`, { params }),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

// Meal Plan API
export const mealPlanAPI = {
  createMealPlan: (data) => api.post('/mealplans', data),
  getMealPlans: (params) => api.get('/mealplans', { params }),
  getMealPlan: (id) => api.get(`/mealplans/${id}`),
  updateMealPlan: (id, data) => api.put(`/mealplans/${id}`, data),
  deleteMealPlan: (id) => api.delete(`/mealplans/${id}`),
};

// AI API
export const aiAPI = {
  suggestRecipes: (data) => api.post('/ai/suggest', data),
};

// User API
export const userAPI = {
  getUserProfile: (id) => api.get(`/users/${id}`),
  getUserRecipes: (id, params) => api.get(`/users/${id}/recipes`, { params }),
  toggleFollow: (id) => api.post(`/users/${id}/follow`),
  updateProfile: (data) => api.put('/users/profile', data),
  getFavorites: () => api.get('/users/favorites/list'),
};

export default api;

