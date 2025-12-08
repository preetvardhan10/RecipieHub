import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mealPlanAPI, recipeAPI } from '../services/api';

const MealPlanner = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    meals: [],
  });
  const [availableRecipes, setAvailableRecipes] = useState([]);

  useEffect(() => {
    if (user) {
      fetchMealPlans();
      fetchRecipes();
    }
  }, [user]);

  const fetchMealPlans = async () => {
    try {
      const response = await mealPlanAPI.getMealPlans();
      setMealPlans(response.data.data.mealPlans || []);
    } catch (error) {
      console.error('Failed to fetch meal plans:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await recipeAPI.getRecipes({ page: 1, limit: 100 });
      setAvailableRecipes(response.data.data.recipes);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addMeal = () => {
    setFormData({
      ...formData,
      meals: [
        ...formData.meals,
        { date: '', mealType: 'Breakfast', recipe: '' },
      ],
    });
  };

  const updateMeal = (index, field, value) => {
    const newMeals = [...formData.meals];
    newMeals[index][field] = value;
    setFormData({ ...formData, meals: newMeals });
  };

  const removeMeal = (index) => {
    const newMeals = formData.meals.filter((_, i) => i !== index);
    setFormData({ ...formData, meals: newMeals });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least one meal is added
    if (!formData.meals || formData.meals.length === 0) {
      alert('Please add at least one meal to the plan');
      return;
    }

    // Validate that all meals have required fields
    for (let i = 0; i < formData.meals.length; i++) {
      const meal = formData.meals[i];
      if (!meal.date || !meal.mealType || !meal.recipe) {
        alert(`Please fill in all fields for meal ${i + 1}`);
        return;
      }
    }

    try {
      await mealPlanAPI.createMealPlan(formData);
      alert('Meal plan created successfully!');
      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        meals: [],
      });
      fetchMealPlans();
    } catch (error) {
      console.error('Failed to create meal plan:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to create meal plan';
      alert(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this meal plan?')) return;
    try {
      await mealPlanAPI.deleteMealPlan(id);
      fetchMealPlans();
    } catch (error) {
      console.error('Failed to delete meal plan:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to access meal planner</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold">Meal Planner</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : '+ Create Meal Plan'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="card mb-8">
            <h2 className="text-2xl font-semibold mb-4">Create New Meal Plan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Meals *
                  </label>
                  <button
                    type="button"
                    onClick={addMeal}
                    className="btn-secondary text-sm"
                  >
                    + Add Meal
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.meals.map((meal, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2">
                      <input
                        type="date"
                        value={meal.date}
                        onChange={(e) => updateMeal(index, 'date', e.target.value)}
                        className="input-field col-span-3"
                        required
                      />
                      <select
                        value={meal.mealType}
                        onChange={(e) => updateMeal(index, 'mealType', e.target.value)}
                        className="input-field col-span-3"
                        required
                      >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snack">Snack</option>
                      </select>
                      <select
                        value={meal.recipe}
                        onChange={(e) => updateMeal(index, 'recipe', e.target.value)}
                        className="input-field col-span-5"
                        required
                      >
                        <option value="">Select Recipe</option>
                        {availableRecipes.map((recipe) => (
                          <option key={recipe.id} value={recipe.id}>
                            {recipe.title}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeMeal(index)}
                        className="col-span-1 text-red-600 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary">
                Create Meal Plan
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealPlans.map((plan) => (
            <div key={plan.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-2">{plan.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(plan.startDate).toLocaleDateString()} -{' '}
                {new Date(plan.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm font-medium">
                {plan.meals?.length || 0} meals planned
              </p>
              <button
                onClick={() => navigate(`/meal-planner/${plan.id}`)}
                className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>

        {mealPlans.length === 0 && !showForm && (
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">You haven't created any meal plans yet.</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Create Your First Meal Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;

