import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../data/mockData';

const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: [''],
    cookingTime: 30,
    servings: 4,
    difficulty: 'medium',
    image: ''
  });

  useEffect(() => {
    if (isEdit) {
      fetchRecipe();
    }
  }, [id]);

  const fetchRecipe = () => {
    // Check user recipes first, then mock recipes
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    let recipe = userRecipes.find(r => r._id === id);
    
    if (!recipe) {
      recipe = getRecipeById(id);
    }
    
    if (recipe) {
      setFormData({
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients.length > 0 ? recipe.ingredients : [{ name: '', quantity: '' }],
        instructions: recipe.instructions.length > 0 ? recipe.instructions : [''],
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine || '',
        image: recipe.image || ''
      });
    } else {
      navigate('/my-recipes');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, field, value) => {
    const ingredients = [...formData.ingredients];
    ingredients[index][field] = value;
    setFormData({ ...formData, ingredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '' }]
    });
  };

  const removeIngredient = (index) => {
    const ingredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients });
  };

  const handleInstructionChange = (index, value) => {
    const instructions = [...formData.instructions];
    instructions[index] = value;
    setFormData({ ...formData, instructions });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, '']
    });
  };

  const removeInstruction = (index) => {
    const instructions = formData.instructions.filter((_, i) => i !== index);
    setFormData({ ...formData, instructions });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const currentUser = JSON.parse(userData);
    const data = {
      _id: isEdit ? id : 'recipe_' + Date.now(),
      ...formData,
      ingredients: formData.ingredients.filter(i => i.name && i.quantity),
      instructions: formData.instructions.filter(i => i.trim()),
      author: { name: currentUser.name, _id: currentUser.id, id: currentUser.id },
      createdAt: isEdit ? undefined : new Date().toISOString(),
      averageRating: 0,
      reviews: []
    };

    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    
    if (isEdit) {
      const index = userRecipes.findIndex(r => r._id === id);
      if (index !== -1) {
        userRecipes[index] = { ...userRecipes[index], ...data };
      }
    } else {
      userRecipes.push(data);
    }

    localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
    navigate('/my-recipes');
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          {isEdit ? 'Edit Recipe' : 'Create New Recipe'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cooking Time (minutes) *</label>
              <input
                type="number"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Servings *</label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
            <input
              type="text"
              name="cuisine"
              value={formData.cuisine || ''}
              onChange={handleChange}
              placeholder="e.g., Italian, Indian, Mexican"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients *</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  className="flex-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              + Add Ingredient
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions *</label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mt-2">
                  {index + 1}
                </span>
                <textarea
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  rows={2}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 self-start mt-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addInstruction}
              className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              + Add Instruction
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 font-semibold"
            >
              {submitting ? 'Saving...' : isEdit ? 'Update Recipe' : 'Create Recipe'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/my-recipes')}
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;

