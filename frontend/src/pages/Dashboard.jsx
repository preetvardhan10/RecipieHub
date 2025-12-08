import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { recipeAPI, mealPlanAPI } from '../services/api';
import RecipeCard from '../components/RecipeCard';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesRes, mealPlansRes] = await Promise.all([
          recipeAPI.getRecipes({ page: 1, limit: 6 }),
          mealPlanAPI.getMealPlans({ page: 1, limit: 3 }),
        ]);

        setRecentRecipes(recipesRes.data.data.recipes);
        setMealPlans(mealPlansRes.data.data.mealPlans);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          url: error.config?.url,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.username}!</h1>
        <p className="text-gray-600 mb-8">Here's what's happening on RecipeHub</p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate('/recipes/new')}
            className="card hover:shadow-lg transition-shadow text-center cursor-pointer"
          >
            <div className="text-4xl mb-2">➕</div>
            <h3 className="font-semibold">Create Recipe</h3>
          </button>
          <button
            onClick={() => navigate('/meal-planner')}
            className="card hover:shadow-lg transition-shadow text-center cursor-pointer"
          >
            <div className="text-4xl mb-2">📅</div>
            <h3 className="font-semibold">Plan Meals</h3>
          </button>
          <button
            onClick={() => navigate('/ai-suggestions')}
            className="card hover:shadow-lg transition-shadow text-center cursor-pointer"
          >
            <div className="text-4xl mb-2">🤖</div>
            <h3 className="font-semibold">AI Suggestions</h3>
          </button>
        </div>

        {/* Recent Recipes */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Recent Recipes</h2>
            <Link to="/explore" className="text-primary-600 hover:text-primary-700">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>

        {/* Meal Plans */}
        {mealPlans.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Your Meal Plans</h2>
              <Link to="/meal-planner" className="text-primary-600 hover:text-primary-700">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mealPlans.map((plan) => (
                <Link
                  key={plan.id}
                  to={`/meal-planner/${plan.id}`}
                  className="card hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{plan.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(plan.startDate).toLocaleDateString()} -{' '}
                    {new Date(plan.endDate).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

