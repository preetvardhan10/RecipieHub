import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/recipes?limit=100&sortBy=rating`);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchRecipes();
      return;
    }
    
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/recipes/search?ingredients=${searchTerm}`);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Discover Amazing Recipes
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Share, explore, and create culinary masterpieces with our community
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2 shadow-2xl">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipes by ingredients... (e.g., chicken, tomatoes, pasta)"
                className="flex-1 px-6 py-4 rounded-l-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-4 rounded-r-xl font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg"
              >
                🔍 Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">{recipes.length}+</div>
              <div className="text-gray-600 mt-1">Featured Recipes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">100+</div>
              <div className="text-gray-600 mt-1">Active Cooks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600 mt-1">Cuisines</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Recipes</h2>
            <p className="text-gray-600">Handpicked favorites from our community</p>
          </div>
          <Link
            to="/explore"
            className="hidden md:block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            View All →
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading delicious recipes...</p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600 text-lg">No recipes found. Be the first to add one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <Link
                key={recipe._id}
                to={`/recipe/${recipe._id}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  {recipe.image ? (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                      <span className="text-6xl">🍽️</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
                    <span className="text-blue-600 font-semibold text-sm">
                      ⭐ {recipe.averageRating || '0.0'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md ${
                      recipe.difficulty === 'easy' ? 'bg-green-500' :
                      recipe.difficulty === 'medium' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                    {recipe.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <span className="mr-1">⏱️</span>
                        {recipe.cookingTime} min
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">👥</span>
                        {recipe.servings} servings
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      {recipe.author?.avatar ? (
                        <img src={recipe.author.avatar} alt={recipe.author.name} className="w-6 h-6 rounded-full" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                          {recipe.author?.name?.charAt(0) || '?'}
                        </div>
                      )}
                      <span className="text-xs text-gray-600">{recipe.author?.name || 'Unknown'}</span>
                    </div>
                    {recipe.cuisine && (
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {recipe.cuisine}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/explore"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl text-lg"
          >
            Explore All Recipes
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose RecipeHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Suggestions</h3>
              <p className="text-gray-600">Get personalized recipe recommendations based on your ingredients</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Meal Planning</h3>
              <p className="text-gray-600">Plan your weekly meals and organize your cooking schedule</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600">Share recipes, rate dishes, and connect with fellow food lovers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
