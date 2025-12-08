import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to RecipeHub</h1>
          <p className="text-xl mb-8 text-primary-100">
            Discover, share, and plan your meals with our smart recipe platform
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/explore"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Recipes
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-4xl mb-4">🍳</div>
            <h3 className="text-xl font-semibold mb-2">Share Recipes</h3>
            <p className="text-gray-600">
              Create and share your favorite recipes with the community
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Meal Planning</h3>
            <p className="text-gray-600">
              Plan your meals for the week with our smart meal planner
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Suggestions</h3>
            <p className="text-gray-600">
              Get personalized recipe suggestions based on your ingredients
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

