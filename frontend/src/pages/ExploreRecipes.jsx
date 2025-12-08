import { useEffect, useState } from 'react';
import { recipeAPI } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import RecipeFilters from '../components/RecipeFilters';

const ExploreRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    cuisine: '',
    difficulty: '',
    maxCookingTime: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
  });

  useEffect(() => {
    fetchRecipes();
  }, [filters, pagination.currentPage]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.currentPage,
        limit: 12,
        ...filters,
      };

      // Remove empty filters
      Object.keys(params).forEach((key) => {
        if (params[key] === '') delete params[key];
      });

      const response = await recipeAPI.getRecipes(params);
      
      // Check if response and data exist
      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      // Handle different response structures
      const recipes = response.data?.data?.recipes || response.data?.recipes || [];
      const paginationData = response.data?.data?.pagination || response.data?.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalResults: 0,
      };

      setRecipes(recipes);
      setPagination(paginationData);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
      
      // Set empty state on error
      setRecipes([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalResults: 0,
      });
      
      // Show error to user only if it's not a network error
      if (error.response) {
        alert(`Failed to load recipes: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('Network error - check API URL and CORS settings');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Explore Recipes</h1>

        <RecipeFilters filters={filters} onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recipes found. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreRecipes;

