import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { recipeAPI, reviewAPI } from '../services/api';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRecipe();
      fetchReviews();
    }
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const response = await recipeAPI.getRecipe(id);
      if (response.data.success && response.data.data.recipe) {
        setRecipe(response.data.data.recipe);
        // Check if recipe is in user's favorites
        if (user?.favorites) {
          const favoriteIds = user.favorites.map(fav => 
            typeof fav === 'string' ? fav : fav.id || fav
          );
          setIsFavorite(favoriteIds.includes(id));
        }
      } else {
        console.error('Recipe not found in response');
      }
    } catch (error) {
      console.error('Failed to fetch recipe:', error);
      console.error('Error details:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getRecipeReviews(id);
      if (response.data.success && response.data.data.reviews) {
        setReviews(response.data.data.reviews);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleRate = async (value) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await recipeAPI.rateRecipe(id, value);
      fetchRecipe();
    } catch (error) {
      console.error('Failed to rate recipe:', error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await recipeAPI.toggleFavorite(id);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSubmitting(true);
    try {
      await reviewAPI.createReview({
        recipeId: id,
        rating,
        comment: reviewText,
      });
      setReviewText('');
      setRating(0);
      fetchReviews();
      fetchRecipe();
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      await recipeAPI.deleteRecipe(id);
      navigate('/my-recipes');
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

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Recipe not found</p>
      </div>
    );
  }

  const isOwner = user?.id === recipe.author?.id || user?.id === recipe.authorId;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Recipe Header */}
        <div className="card mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
              <p className="text-gray-600 mb-4">{recipe.description}</p>
            </div>
            {isAuthenticated && (
              <button
                onClick={handleToggleFavorite}
                className="text-2xl"
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              {recipe.cuisine}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              {recipe.difficulty}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              ⏱️ {recipe.cookingTime} min
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              👥 {recipe.servings} servings
            </span>
            {recipe.averageRating > 0 && (
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                ⭐ {recipe.averageRating} ({recipe.reviewCount} reviews)
              </span>
            )}
          </div>

          {isOwner && (
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/recipes/${id}/edit`)}
                className="btn-secondary text-sm"
              >
                Edit
              </button>
              <button onClick={handleDelete} className="btn-secondary text-sm bg-red-100 hover:bg-red-200">
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Recipe Image */}
        {recipe.image && (
          <div className="card mb-6">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Ingredients */}
        <div className="card mb-6">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                <span>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="card mb-6">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction) => (
              <li key={instruction.step} className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                  {instruction.step}
                </span>
                <p className="pt-1">{instruction.instruction}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Rating Section */}
        {isAuthenticated && (
          <div className="card mb-6">
            <h2 className="text-2xl font-semibold mb-4">Rate this Recipe</h2>
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRate(value)}
                  className={`text-3xl ${
                    recipe.averageRating >= value ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-400 transition-colors`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="card mb-6">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

          {/* Add Review Form */}
          {isAuthenticated && (
            <form onSubmit={handleSubmitReview} className="mb-6 pb-6 border-b">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className={`text-2xl ${
                        rating >= value ? 'text-yellow-400' : 'text-gray-300'
                      } hover:text-yellow-400 transition-colors`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="input-field"
                  rows="4"
                  placeholder="Share your thoughts about this recipe..."
                  required
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">
                        {review.user?.username || 'Anonymous'}
                      </span>
                      <span className="text-yellow-400">
                        {'⭐'.repeat(review.rating)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

