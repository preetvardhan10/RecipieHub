import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiAPI, recipeAPI } from '../services/api';

const AISuggestions = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ingredients: '',
    dietaryPreferences: '',
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ingredientsArray = formData.ingredients
        .split(',')
        .map((ing) => ing.trim())
        .filter((ing) => ing.length > 0);

      if (ingredientsArray.length === 0) {
        alert('Please enter at least one ingredient');
        setLoading(false);
        return;
      }

      const response = await aiAPI.suggestRecipes({
        ingredients: ingredientsArray,
        dietaryPreferences: formData.dietaryPreferences || undefined,
      });

      if (response.data.success && response.data.data.recipes) {
        setSuggestions(response.data.data.recipes);
      } else {
        alert('No recipes generated. Please try again.');
      }
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      let errorMessage = 'Failed to get AI suggestions.';
      
      if (error.response?.status === 401) {
        errorMessage = 'Invalid OpenAI API key. Please check the backend .env file.';
      } else {
        errorMessage = error.response?.data?.message || 
                      error.response?.data?.error || 
                      'Failed to get AI suggestions.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecipe = async (suggestion) => {
    try {
      // Ensure all required fields are present
      const recipeData = {
        title: suggestion.title,
        description: suggestion.description || '',
        cuisine: suggestion.cuisine || 'International',
        difficulty: suggestion.difficulty || 'Medium',
        cookingTime: suggestion.cookingTime || 30,
        servings: suggestion.servings || 4,
        ingredients: suggestion.ingredients || [],
        instructions: suggestion.instructions || [],
        tags: suggestion.tags || [],
        image: suggestion.image || ''
      };

      const response = await recipeAPI.createRecipe(recipeData);
      if (response.data.success) {
        alert('Recipe created successfully!');
        navigate('/my-recipes');
      }
    } catch (error) {
      console.error('Failed to create recipe:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to create recipe';
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">AI Recipe Suggestions</h1>

        <form onSubmit={handleSubmit} className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">What ingredients do you have?</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients (comma-separated) *
            </label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="input-field"
              rows="3"
              placeholder="e.g., chicken, tomatoes, onions, garlic"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dietary Preferences (optional)
            </label>
            <input
              type="text"
              name="dietaryPreferences"
              value={formData.dietaryPreferences}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., vegetarian, gluten-free, keto"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Generating suggestions...' : 'Get AI Suggestions'}
          </button>
        </form>

        {suggestions.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Suggested Recipes</h2>
            <div className="space-y-6">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold">{suggestion.title}</h3>
                    <button
                      onClick={() => handleCreateRecipe(suggestion)}
                      className="btn-primary text-sm"
                    >
                      Create Recipe
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{suggestion.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Cuisine:</span>
                      <p className="font-medium">{suggestion.cuisine}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Difficulty:</span>
                      <p className="font-medium">{suggestion.difficulty}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Time:</span>
                      <p className="font-medium">{suggestion.cookingTime} min</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Servings:</span>
                      <p className="font-medium">{suggestion.servings}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Ingredients:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {suggestion.ingredients?.map((ing, i) => (
                        <li key={i} className="text-sm">
                          {ing.quantity} {ing.unit} {ing.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      {suggestion.instructions?.map((inst, i) => (
                        <li key={i} className="text-sm">{inst.instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;

