import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="card hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gray-200">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        )}
        {recipe.averageRating > 0 && (
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-primary-600">
            ⭐ {recipe.averageRating}
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{recipe.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {recipe.cookingTime} min
        </span>
        <span className="px-2 py-1 bg-gray-100 rounded-full">{recipe.cuisine}</span>
      </div>
      {recipe.author && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            By <span className="font-medium">{recipe.author.username}</span>
          </p>
        </div>
      )}
    </Link>
  );
};

export default RecipeCard;

