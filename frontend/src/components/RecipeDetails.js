import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipeById } from '../data/mockData';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchRecipe();
  }, [id]);

  const fetchRecipe = () => {
    // Check user recipes first, then mock recipes
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    let foundRecipe = userRecipes.find(r => r._id === id);
    
    if (!foundRecipe) {
      foundRecipe = getRecipeById(id);
    }
    
    if (foundRecipe) {
      // Deep clone to avoid mutating original
      const recipeCopy = JSON.parse(JSON.stringify(foundRecipe));
      
      // Add totalRatings for display
      recipeCopy.totalRatings = recipeCopy.reviews?.length || 0;
      
      // Check if favorited
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(id));
      
      setRecipe(recipeCopy);
    }
    setLoading(false);
  };

  const handleFavorite = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    
    // Add review to recipe
    const newReview = {
      ...review,
      user: { name: user.name },
      createdAt: new Date().toISOString()
    };
    
    const recipeCopy = JSON.parse(JSON.stringify(recipe));
    if (!recipeCopy.reviews) {
      recipeCopy.reviews = [];
    }
    recipeCopy.reviews.push(newReview);
    
    // Recalculate average rating
    const totalRating = recipeCopy.reviews.reduce((sum, r) => sum + r.rating, 0);
    recipeCopy.averageRating = (totalRating / recipeCopy.reviews.length).toFixed(1);
    recipeCopy.totalRatings = recipeCopy.reviews.length;
    
    // Update in localStorage if it's a user recipe
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    const recipeIndex = userRecipes.findIndex(r => r._id === id);
    if (recipeIndex !== -1) {
      userRecipes[recipeIndex] = recipeCopy;
      localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
    }
    
    setRecipe(recipeCopy);
    setReview({ rating: 5, comment: '' });
    setSubmitting(false);
  };

  const canEdit = user && recipe && ((recipe.author._id || recipe.author.id) === (user.id || user._id));

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    // In a real app, this would delete from the backend
    // For now, just navigate away
    alert('In standalone mode, recipes cannot be deleted. This would normally delete the recipe from the database.');
    navigate('/explore');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Recipe not found</p>
          <Link to="/explore" className="text-orange-600 hover:underline">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
          {recipe.image && (
            <div className="relative h-80 overflow-hidden bg-gray-200">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                {user && (
                  <button
                    onClick={handleFavorite}
                    className={`px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm transition-all ${
                      isFavorite 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-white/90 text-gray-700 hover:bg-white'
                    }`}
                  >
                    {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
                  </button>
                )}
                {canEdit && (
                  <>
                    <Link
                      to={`/recipe/${id}/edit`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all backdrop-blur-sm"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all backdrop-blur-sm"
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{recipe.description}</p>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center bg-orange-50 px-4 py-2 rounded-lg">
                    <span className="text-2xl mr-2">⏱️</span>
                    <span className="font-semibold text-gray-700">{recipe.cookingTime} min</span>
                  </div>
                  <div className="flex items-center bg-orange-50 px-4 py-2 rounded-lg">
                    <span className="text-2xl mr-2">👥</span>
                    <span className="font-semibold text-gray-700">{recipe.servings} servings</span>
                  </div>
                  <div className="flex items-center bg-orange-50 px-4 py-2 rounded-lg">
                    <span className="text-2xl mr-2">⭐</span>
                    <span className="font-semibold text-gray-700">
                      {recipe.averageRating || '0.0'} ({recipe.totalRatings} ratings)
                    </span>
                  </div>
                  <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    recipe.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {recipe.difficulty}
                  </span>
                  {recipe.cuisine && (
                    <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg font-semibold text-sm">
                      {recipe.cuisine}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                  {recipe.author?.avatar ? (
                    <img src={recipe.author.avatar} alt={recipe.author.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                      {recipe.author?.name?.charAt(0) || '?'}
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Recipe by</p>
                    <Link 
                      to={`/user/${recipe.author._id || recipe.author.id}`} 
                      className="text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                    >
                      {recipe.author.name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ingredients */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-3xl">🥘</span>
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start p-3 rounded-lg hover:bg-orange-50 transition-colors">
                  <span className="text-orange-600 mr-3 mt-1">✓</span>
                  <div>
                    <span className="font-semibold text-gray-900">{ingredient.quantity}</span>
                    <span className="ml-2 text-gray-700">{ingredient.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-3xl">📝</span>
              Instructions
            </h2>
            <ol className="space-y-6">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-md">
                    {index + 1}
                  </span>
                  <span className="flex-1 pt-2 text-gray-700 leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3 text-3xl">💬</span>
            Reviews ({recipe.reviews?.length || 0})
          </h2>
          
          {user && (
            <form onSubmit={handleReviewSubmit} className="mb-8 pb-8 border-b border-gray-200 bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                  <select
                    value={review.rating}
                    onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value={5}>5 ⭐ - Excellent</option>
                    <option value={4}>4 ⭐ - Very Good</option>
                    <option value={3}>3 ⭐ - Good</option>
                    <option value={2}>2 ⭐ - Fair</option>
                    <option value={1}>1 ⭐ - Poor</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Comment</label>
                <textarea
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Share your thoughts about this recipe..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {submitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                    Submitting...
                  </span>
                ) : (
                  'Submit Review'
                )}
              </button>
            </form>
          )}

          {recipe.reviews && recipe.reviews.length > 0 ? (
            <div className="space-y-6">
              {recipe.reviews.map((reviewItem, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {reviewItem.user?.avatar ? (
                        <img src={reviewItem.user.avatar} alt={reviewItem.user.name} className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                          {reviewItem.user?.name?.charAt(0) || '?'}
                        </div>
                      )}
                      <div>
                        <span className="font-semibold text-gray-900 block">{reviewItem.user?.name || 'Anonymous'}</span>
                        <span className="text-yellow-500 text-lg">
                          {'⭐'.repeat(reviewItem.rating)}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(reviewItem.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  {reviewItem.comment && (
                    <p className="text-gray-700 leading-relaxed ml-13">{reviewItem.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <span className="text-5xl mb-4 block">💭</span>
              <p className="text-gray-600 text-lg">No reviews yet. Be the first to review!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

