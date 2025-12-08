import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockRecipes, getCuisines } from '../data/mockData';

const Explore = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    difficulty: '',
    sortBy: 'date'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  const getAllRecipes = () => {
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    return [...mockRecipes, ...userRecipes];
  };

  useEffect(() => {
    fetchRecipes();
  }, [filters, pagination.page]);

  const fetchRecipes = () => {
    setLoading(true);
    
    // Get all recipes (mock + user)
    let filtered = getAllRecipes();
    
    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchLower))
      );
    }
    
    if (filters.cuisine) {
      filtered = filtered.filter(recipe => recipe.cuisine === filters.cuisine);
    }
    
    if (filters.difficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }
    
    // Sort
    if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    } else if (filters.sortBy === 'time') {
      filtered.sort((a, b) => a.cookingTime - b.cookingTime);
    } else {
      filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    
    // Update pagination
    const total = filtered.length;
    const pages = Math.ceil(total / pagination.limit);
    
    // Apply pagination
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    filtered = filtered.slice(startIndex, endIndex);
    
    setRecipes(filtered);
    setPagination({
      ...pagination,
      total,
      pages
    });
    
    setLoading(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setPagination({ ...pagination, page: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Recipes</h1>
          <p className="text-gray-600">Discover amazing recipes from our community</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search recipes..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cuisine</label>
              <select
                value={filters.cuisine}
                onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Cuisines</option>
                {(() => {
                  const allRecipes = getAllRecipes();
                  const cuisines = [...new Set(allRecipes.map(r => r.cuisine).filter(Boolean))];
                  return cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ));
                })()}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="time">Quickest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading recipes...</p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-600 text-lg">No recipes found matching your criteria.</p>
            <button
              onClick={() => {
                setFilters({ search: '', cuisine: '', difficulty: '', sortBy: 'date' });
                setPagination({ ...pagination, page: 1 });
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-4 bg-white rounded-xl shadow-md p-6 border border-gray-100 mt-8">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 hover:bg-blue-50 hover:border-blue-700 active:bg-blue-100 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  ← Previous
                </button>
                <span className="text-gray-700 px-6 py-2 bg-gray-50 rounded-lg font-semibold border border-gray-200">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.pages}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-gray-300 hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
