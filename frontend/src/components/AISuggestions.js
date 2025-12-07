import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const AISuggestions = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [cuisine, setCuisine] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const navigate = useNavigate();

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'Low-Carb', 'High-Protein', 'Low-Fat', 'Nut-Free'];
  
  const commonIngredients = [
    // Proteins
    'Chicken', 'Chicken Breast', 'Chicken Thighs', 'Ground Chicken', 'Beef', 'Ground Beef', 'Beef Steak', 'Pork', 'Pork Chops', 'Ground Pork',
    'Fish', 'Salmon', 'Tuna', 'Cod', 'Shrimp', 'Crab', 'Lobster', 'Mussels', 'Clams', 'Scallops',
    'Eggs', 'Turkey', 'Ground Turkey', 'Lamb', 'Bacon', 'Sausage', 'Ham', 'Deli Meat',
    // Dairy
    'Milk', 'Butter', 'Cheese', 'Parmesan', 'Mozzarella', 'Cheddar', 'Feta', 'Goat Cheese', 'Cream Cheese', 'Ricotta',
    'Yogurt', 'Greek Yogurt', 'Sour Cream', 'Heavy Cream', 'Buttermilk', 'Cottage Cheese',
    // Vegetables
    'Onion', 'Garlic', 'Ginger', 'Tomato', 'Cherry Tomatoes', 'Potato', 'Sweet Potato', 'Carrot', 'Bell Pepper', 'Red Bell Pepper',
    'Green Bell Pepper', 'Broccoli', 'Cauliflower', 'Spinach', 'Lettuce', 'Arugula', 'Kale', 'Cabbage', 'Red Cabbage',
    'Mushroom', 'Zucchini', 'Yellow Squash', 'Eggplant', 'Asparagus', 'Green Beans', 'Peas', 'Corn', 'Celery',
    'Cucumber', 'Avocado', 'Radish', 'Beets', 'Turnip', 'Brussels Sprouts', 'Artichoke', 'Leeks', 'Shallots',
    // Grains & Starches
    'Rice', 'Brown Rice', 'White Rice', 'Jasmine Rice', 'Basmati Rice', 'Wild Rice', 'Pasta', 'Spaghetti', 'Penne', 'Fettuccine',
    'Bread', 'Whole Wheat Bread', 'Tortilla', 'Flour Tortilla', 'Corn Tortilla', 'Naan', 'Pita Bread',
    'Quinoa', 'Oats', 'Rolled Oats', 'Barley', 'Couscous', 'Bulgur', 'Farro', 'Noodles', 'Ramen Noodles', 'Rice Noodles',
    // Legumes & Beans
    'Beans', 'Black Beans', 'Kidney Beans', 'Cannellini Beans', 'Chickpeas', 'Lentils', 'Red Lentils', 'Green Lentils',
    'Black-Eyed Peas', 'Pinto Beans', 'Navy Beans', 'Edamame', 'Tofu', 'Tempeh',
    // Fruits
    'Lemon', 'Lime', 'Orange', 'Apple', 'Banana', 'Berries', 'Strawberries', 'Blueberries', 'Raspberries',
    'Mango', 'Pineapple', 'Coconut', 'Dates', 'Raisins', 'Cranberries',
    // Oils & Fats
    'Olive Oil', 'Extra Virgin Olive Oil', 'Vegetable Oil', 'Canola Oil', 'Coconut Oil', 'Sesame Oil', 'Avocado Oil',
    'Butter', 'Ghee', 'Lard',
    // Herbs & Spices
    'Basil', 'Oregano', 'Thyme', 'Rosemary', 'Parsley', 'Cilantro', 'Dill', 'Mint', 'Sage', 'Bay Leaves',
    'Cumin', 'Coriander', 'Turmeric', 'Paprika', 'Chili Powder', 'Cayenne Pepper', 'Red Pepper Flakes',
    'Cinnamon', 'Nutmeg', 'Allspice', 'Cloves', 'Cardamom', 'Star Anise', 'Fennel Seeds', 'Mustard Seeds',
    'Black Pepper', 'White Pepper', 'Salt', 'Sea Salt', 'Garlic Powder', 'Onion Powder',
    // Condiments & Sauces
    'Soy Sauce', 'Tamari', 'Worcestershire Sauce', 'Hot Sauce', 'Sriracha', 'Chili Sauce', 'Mustard', 'Dijon Mustard',
    'Mayonnaise', 'Ketchup', 'BBQ Sauce', 'Teriyaki Sauce', 'Hoisin Sauce', 'Oyster Sauce', 'Fish Sauce',
    'Vinegar', 'Balsamic Vinegar', 'Apple Cider Vinegar', 'Rice Vinegar', 'White Wine Vinegar',
    'Tahini', 'Peanut Butter', 'Almond Butter', 'Jam', 'Jelly', 'Honey', 'Maple Syrup', 'Agave Nectar',
    // Pantry Staples
    'Flour', 'All-Purpose Flour', 'Whole Wheat Flour', 'Baking Powder', 'Baking Soda', 'Cornstarch', 'Sugar', 'Brown Sugar',
    'Vanilla Extract', 'Almond Extract', 'Cocoa Powder', 'Chocolate', 'Dark Chocolate', 'Milk Chocolate',
    // Canned & Packaged
    'Tomato Sauce', 'Tomato Paste', 'Crushed Tomatoes', 'Diced Tomatoes', 'Coconut Milk', 'Coconut Cream',
    'Stock', 'Chicken Stock', 'Beef Stock', 'Vegetable Stock', 'Broth', 'Chicken Broth', 'Beef Broth',
    // Nuts & Seeds
    'Almonds', 'Walnuts', 'Pecans', 'Cashews', 'Pistachios', 'Hazelnuts', 'Pine Nuts', 'Peanuts',
    'Sesame Seeds', 'Sunflower Seeds', 'Pumpkin Seeds', 'Chia Seeds', 'Flax Seeds',
    // Beverages
    'Wine', 'White Wine', 'Red Wine', 'Beer', 'Sake', 'Mirin',
    // Plant-Based Alternatives
    'Soy Milk', 'Almond Milk', 'Oat Milk', 'Coconut Milk', 'Plant-Based Butter', 'Nutritional Yeast'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${config.API_BASE_URL}/api/ai/suggest`,
        {
          ingredients: selectedIngredients,
          dietaryPreferences,
          cuisine
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Unknown error occurred';
      alert(`Error getting suggestions: ${errorMessage}. ${error.response?.data?.details ? `Details: ${error.response.data.details}` : 'Please check your OpenAI API key or try again.'}`);
      
      // If there are similar recipes, show them anyway
      if (error.response?.data?.similarRecipes) {
        setSuggestions({
          aiSuggestions: [],
          similarRecipes: error.response.data.similarRecipes,
          message: error.response.data.message || 'AI service unavailable, showing similar recipes from database'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleDietaryPreference = (pref) => {
    if (dietaryPreferences.includes(pref)) {
      setDietaryPreferences(dietaryPreferences.filter(p => p !== pref));
    } else {
      setDietaryPreferences([...dietaryPreferences, pref]);
    }
  };

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">AI Recipe Suggestions</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Ingredients * (Select from list)
            </label>
            <div className="border border-gray-300 rounded-md p-3 max-h-60 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {commonIngredients.map((ingredient) => (
                  <label key={ingredient} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ingredient)}
                      onChange={() => toggleIngredient(ingredient)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{ingredient}</span>
                  </label>
                ))}
              </div>
            </div>
            {selectedIngredients.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Selected: </span>
                {selectedIngredients.map((ing) => (
                  <span key={ing} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {ing}
                  </span>
                ))}
              </div>
            )}
            {selectedIngredients.length === 0 && (
              <p className="mt-2 text-sm text-red-600">Please select at least one ingredient</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preferences</label>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleDietaryPreference(option)}
                  className={`px-4 py-2 rounded-md ${
                    dietaryPreferences.includes(option)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="Mexican">Mexican</option>
              <option value="American">American</option>
              <option value="Thai">Thai</option>
              <option value="Japanese">Japanese</option>
              <option value="French">French</option>
              <option value="Greek">Greek</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="Spanish">Spanish</option>
              <option value="Korean">Korean</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Middle Eastern">Middle Eastern</option>
              <option value="British">British</option>
              <option value="German">German</option>
              <option value="Caribbean">Caribbean</option>
              <option value="African">African</option>
              <option value="Filipino">Filipino</option>
              <option value="Indonesian">Indonesian</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 font-semibold"
            disabled={selectedIngredients.length === 0 || loading}
          >
            {loading ? 'Getting Suggestions...' : 'Get AI Suggestions'}
          </button>
        </form>

        {suggestions && (
          <div className="space-y-6">
            {suggestions.message && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800">{suggestions.message}</p>
              </div>
            )}
            {suggestions.aiSuggestions && suggestions.aiSuggestions.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Recipe Suggestions</h2>
                <p className="text-gray-600 mb-6">Here are {suggestions.aiSuggestions.length} creative recipes based on your ingredients:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {suggestions.aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-800">{suggestion.title}</h3>
                        {suggestion.cuisine && (
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                            {suggestion.cuisine}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4 text-sm">{suggestion.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4 pb-4 border-b">
                        <span className="flex items-center">⏱️ {suggestion.cookingTime || 30} min</span>
                        <span className="flex items-center">👥 {suggestion.servings || 4} servings</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          suggestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          suggestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {suggestion.difficulty || 'medium'}
                        </span>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-gray-800">Ingredients:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {suggestion.ingredients && suggestion.ingredients.length > 0 ? (
                            suggestion.ingredients.map((ing, i) => (
                              <li key={i}>{ing}</li>
                            ))
                          ) : (
                            <li className="text-gray-400">No ingredients listed</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-800">Instructions:</h4>
                        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                          {suggestion.instructions && suggestion.instructions.length > 0 ? (
                            suggestion.instructions.map((step, i) => (
                              <li key={i} className="mb-1">{step}</li>
                            ))
                          ) : (
                            <li className="text-gray-400">No instructions provided</li>
                          )}
                        </ol>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(!suggestions.aiSuggestions || suggestions.aiSuggestions.length === 0) && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">No AI suggestions available. Check similar recipes below or try again with different ingredients.</p>
              </div>
            )}

            {suggestions.similarRecipes && suggestions.similarRecipes.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Similar Recipes from Community</h2>
                <p className="text-gray-600 mb-6">Found {suggestions.similarRecipes.length} recipe{suggestions.similarRecipes.length !== 1 ? 's' : ''} with similar ingredients:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestions.similarRecipes.map((recipe) => (
                    <a
                      key={recipe._id}
                      href={`/recipe/${recipe._id}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
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
                          <span>⭐ {recipe.averageRating ? recipe.averageRating.toFixed(1) : '0.0'}</span>
                        </div>
                        {recipe.cuisine && (
                          <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                            {recipe.cuisine}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
            {(!suggestions.similarRecipes || suggestions.similarRecipes.length === 0) && 
             (!suggestions.aiSuggestions || suggestions.aiSuggestions.length === 0) && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-2">No recipes found matching your criteria.</p>
                <p className="text-sm text-gray-500">Try selecting different ingredients or adjusting your preferences.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;

