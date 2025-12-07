import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ recipes: 0, favorites: 0 });
  const [recentRecipes, setRecentRecipes] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      fetchStats();
      fetchRecentRecipes();
    }
  }, []);

  const fetchStats = async () => {
    try {
      const userData = localStorage.getItem('user');
      const currentUser = JSON.parse(userData);
      const token = localStorage.getItem('token');
      
      const [recipesRes, favoritesRes] = await Promise.all([
        axios.get(`${config.API_BASE_URL}/api/users/${currentUser.id}/recipes`),
        axios.get(`${config.API_BASE_URL}/api/users/${currentUser.id}/favorites`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setStats({
        recipes: recipesRes.data.length,
        favorites: favoritesRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentRecipes = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/recipes?limit=3`);
      setRecentRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching recent recipes:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Ready to discover amazing recipes?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">My Recipes</p>
                <p className="text-3xl font-bold text-gray-800">{stats.recipes}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <Link
              to="/my-recipes"
              className="text-orange-600 hover:underline text-sm mt-4 inline-block"
            >
              View all →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Favorites</p>
                <p className="text-3xl font-bold text-gray-800">{stats.favorites}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
            </div>
            <Link
              to="/profile"
              className="text-orange-600 hover:underline text-sm mt-4 inline-block"
            >
              View favorites →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Quick Actions</p>
                <p className="text-lg font-semibold text-gray-800">Get Started</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Link
                to="/recipe/new"
                className="text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700"
              >
                Create Recipe
              </Link>
              <Link
                to="/ai-suggestions"
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                AI Suggestions
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/explore"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Explore Recipes</h2>
            <p className="text-gray-600">Discover new recipes from our community</p>
          </Link>

          <Link
            to="/meal-planner"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Meal Planner</h2>
            <p className="text-gray-600">Plan your weekly meals</p>
          </Link>
        </div>

        {/* Recent Recipes */}
        {recentRecipes.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Recent Recipes</h2>
              <Link to="/explore" className="text-orange-600 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentRecipes.map((recipe) => (
                <Link
                  key={recipe._id}
                  to={`/recipe/${recipe._id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>⏱️ {recipe.cookingTime} min</span>
                      <span>⭐ {recipe.averageRating || '0'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
