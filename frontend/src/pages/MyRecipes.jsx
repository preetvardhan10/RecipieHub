import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { recipeAPI } from '../services/api';
import RecipeCard from '../components/RecipeCard';

const MyRecipes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchMyRecipes();
    }
  }, [user]);

  const fetchMyRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeAPI.getRecipes({ page: 1, limit: 100 });
      if (response.data.success && response.data.data.recipes) {
        // Filter recipes by current user
        const myRecipes = response.data.data.recipes.filter(
          (recipe) => recipe.author?.id === user.id
        );
        setRecipes(myRecipes);
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      await recipeAPI.deleteRecipe(id);
      fetchMyRecipes();
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Recipes</h1>
          <button
            onClick={() => navigate('/recipes/new')}
            className="btn-primary"
          >
            + Create New Recipe
          </button>
        </div>

        {recipes.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">You haven't created any recipes yet.</p>
            <button
              onClick={() => navigate('/recipes/new')}
              className="btn-primary"
            >
              Create Your First Recipe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="relative">
                <RecipeCard recipe={recipe} />
                <div className="absolute top-2 left-2 flex space-x-2">
                  <button
                    onClick={() => navigate(`/recipes/${recipe.id}/edit`)}
                    className="bg-white px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;

