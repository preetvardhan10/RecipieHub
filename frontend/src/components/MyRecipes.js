import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchMyRecipes();
  }, [navigate]);

  const fetchMyRecipes = () => {
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    const userData = localStorage.getItem('user');
    if (!userData) return;
    
    const currentUser = JSON.parse(userData);
    // Filter recipes by current user
    const myRecipes = userRecipes.filter(r => (r.author._id || r.author.id) === (currentUser.id || currentUser._id));
    setRecipes(myRecipes);
    setLoading(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    const updatedRecipes = userRecipes.filter(r => r._id !== id);
    localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes));
    fetchMyRecipes();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading your recipes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Recipes</h1>
          <Link
            to="/recipe/new"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            + Create New Recipe
          </Link>
        </div>

        {recipes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">You haven't created any recipes yet.</p>
            <Link
              to="/recipe/new"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Create Your First Recipe
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
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
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>⏱️ {recipe.cookingTime} min</span>
                    <span>👥 {recipe.servings} servings</span>
                    <span className="text-orange-600">⭐ {recipe.averageRating || '0'}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/recipe/${recipe._id}`}
                      className="flex-1 text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      View
                    </Link>
                    <Link
                      to={`/recipe/${recipe._id}/edit`}
                      className="flex-1 text-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
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

