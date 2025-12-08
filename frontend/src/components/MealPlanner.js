import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockRecipes } from '../data/mockData';

const MealPlanner = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    weekStartDate: '',
    meals: {}
  });
  const navigate = useNavigate();

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    fetchMealPlans();
    fetchRecipes();
  }, [navigate]);

  const fetchMealPlans = () => {
    const plans = JSON.parse(localStorage.getItem('mealPlans') || '[]');
    setMealPlans(plans);
    setLoading(false);
  };

  const fetchRecipes = () => {
    // Combine mock recipes with user recipes
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    setRecipes([...mockRecipes, ...userRecipes]);
  };

  const handleMealChange = (day, mealType, recipeId) => {
    setFormData({
      ...formData,
      meals: {
        ...formData.meals,
        [`${day}-${mealType}`]: recipeId
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const meals = [];
    
    Object.keys(formData.meals).forEach(key => {
      if (formData.meals[key]) {
        const [day, mealType] = key.split('-');
        const recipe = recipes.find(r => r._id === formData.meals[key]);
        meals.push({
          day,
          mealType,
          recipe: recipe || { _id: formData.meals[key], title: 'Recipe' }
        });
      }
    });

    const newPlan = {
      _id: 'plan_' + Date.now(),
      weekStartDate: formData.weekStartDate,
      meals
    };

    const plans = JSON.parse(localStorage.getItem('mealPlans') || '[]');
    plans.push(newPlan);
    localStorage.setItem('mealPlans', JSON.stringify(plans));

    setShowForm(false);
    setFormData({ weekStartDate: '', meals: {} });
    fetchMealPlans();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading meal plans...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Meal Planner</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            {showForm ? 'Cancel' : '+ Create Meal Plan'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Week Start Date
              </label>
              <input
                type="date"
                value={formData.weekStartDate}
                onChange={(e) => setFormData({ ...formData, weekStartDate: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Day</th>
                    {mealTypes.map(type => (
                      <th key={type} className="px-4 py-2 text-left capitalize">{type}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map(day => (
                    <tr key={day} className="border-t">
                      <td className="px-4 py-2 font-medium capitalize">{day}</td>
                      {mealTypes.map(mealType => (
                        <td key={mealType} className="px-4 py-2">
                          <select
                            value={formData.meals[`${day}-${mealType}`] || ''}
                            onChange={(e) => handleMealChange(day, mealType, e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            <option value="">Select recipe</option>
                            {recipes.map(recipe => (
                              <option key={recipe._id} value={recipe._id}>
                                {recipe.title}
                              </option>
                            ))}
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="submit"
              className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Save Meal Plan
            </button>
          </form>
        )}

        {mealPlans.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">You haven't created any meal plans yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {mealPlans.map(plan => (
              <div key={plan._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Week of {new Date(plan.weekStartDate).toLocaleDateString()}
                  </h2>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this meal plan?')) {
                        const plans = JSON.parse(localStorage.getItem('mealPlans') || '[]');
                        const updatedPlans = plans.filter(p => p._id !== plan._id);
                        localStorage.setItem('mealPlans', JSON.stringify(updatedPlans));
                        fetchMealPlans();
                      }
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">Day</th>
                        {mealTypes.map(type => (
                          <th key={type} className="px-4 py-2 text-left capitalize">{type}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {days.map(day => (
                        <tr key={day} className="border-t">
                          <td className="px-4 py-2 font-medium capitalize">{day}</td>
                          {mealTypes.map(mealType => {
                            const meal = plan.meals.find(
                              m => m.day === day && m.mealType === mealType
                            );
                            return (
                              <td key={mealType} className="px-4 py-2">
                                {meal?.recipe ? (
                                  <Link
                                    to={`/recipe/${meal.recipe._id || meal.recipe}`}
                                    className="text-orange-600 hover:underline"
                                  >
                                    {meal.recipe.title || 'Recipe'}
                                  </Link>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;

