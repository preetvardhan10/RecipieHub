import { useState } from 'react';

const RecipeFilters = ({ onFilterChange, filters }) => {
  const [localFilters, setLocalFilters] = useState(filters || {
    cuisine: '',
    difficulty: '',
    maxCookingTime: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const handleChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared = {
      cuisine: '',
      difficulty: '',
      maxCookingTime: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    setLocalFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-semibold mb-4">Filters & Search</h2>
      
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={localFilters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Cuisine Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cuisine
          </label>
          <input
            type="text"
            placeholder="e.g., Italian, Asian"
            value={localFilters.cuisine}
            onChange={(e) => handleChange('cuisine', e.target.value)}
            className="input-field"
          />
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            value={localFilters.difficulty}
            onChange={(e) => handleChange('difficulty', e.target.value)}
            className="input-field"
          >
            <option value="">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Cooking Time Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Cooking Time (min)
          </label>
          <input
            type="number"
            placeholder="e.g., 30"
            value={localFilters.maxCookingTime}
            onChange={(e) => handleChange('maxCookingTime', e.target.value)}
            className="input-field"
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="input-field"
          >
            <option value="createdAt">Date Added</option>
            <option value="rating">Rating</option>
            <option value="cookingTime">Cooking Time</option>
          </select>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="btn-secondary text-sm"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default RecipeFilters;

