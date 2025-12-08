// Fallback recipe generator when OpenAI API is unavailable
// This generates simple recipe suggestions based on ingredients

const generateFallbackRecipes = (ingredients, dietaryPreferences) => {
  const ingredientsList = Array.isArray(ingredients) ? ingredients : [ingredients];
  const mainIngredient = ingredientsList[0]?.toLowerCase() || 'ingredients';
  
  const recipes = [
    {
      title: `${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} Stir Fry`,
      description: `A quick and easy stir fry using ${ingredientsList.join(', ')}. Perfect for a weeknight dinner that's both healthy and delicious.`,
      ingredients: [
        { name: mainIngredient, quantity: '400', unit: 'g' },
        { name: 'onion', quantity: '1', unit: 'large' },
        { name: 'garlic', quantity: '3', unit: 'cloves' },
        { name: 'soy sauce', quantity: '2', unit: 'tbsp' },
        { name: 'vegetable oil', quantity: '2', unit: 'tbsp' }
      ],
      instructions: [
        { step: 1, instruction: `Heat oil in a large pan or wok over high heat.` },
        { step: 2, instruction: `Add ${mainIngredient} and cook until browned, about 5 minutes.` },
        { step: 3, instruction: `Add onions and garlic, stir-fry for 2-3 minutes.` },
        { step: 4, instruction: `Add soy sauce and any remaining ingredients. Cook for 2 more minutes and serve hot.` }
      ],
      cuisine: 'Asian',
      difficulty: 'Easy',
      cookingTime: 20,
      servings: 4,
      tags: ['quick', 'stir-fry', 'easy']
    },
    {
      title: `${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} Salad`,
      description: `A fresh and healthy salad featuring ${ingredientsList.join(', ')}. Light, nutritious, and perfect for lunch or a light dinner.`,
      ingredients: [
        { name: mainIngredient, quantity: '300', unit: 'g' },
        { name: 'mixed greens', quantity: '200', unit: 'g' },
        { name: 'tomatoes', quantity: '2', unit: 'medium' },
        { name: 'olive oil', quantity: '3', unit: 'tbsp' },
        { name: 'lemon juice', quantity: '2', unit: 'tbsp' },
        { name: 'salt', quantity: 'to taste', unit: '' }
      ],
      instructions: [
        { step: 1, instruction: `Wash and prepare all vegetables.` },
        { step: 2, instruction: `Combine ${mainIngredient} with mixed greens and tomatoes in a large bowl.` },
        { step: 3, instruction: `Whisk together olive oil, lemon juice, and salt to make dressing.` },
        { step: 4, instruction: `Toss salad with dressing and serve immediately.` }
      ],
      cuisine: 'Mediterranean',
      difficulty: 'Easy',
      cookingTime: 15,
      servings: 2,
      tags: ['salad', 'healthy', 'fresh']
    },
    {
      title: `${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} Pasta`,
      description: `A simple pasta dish with ${ingredientsList.join(', ')}. Comforting and satisfying, this recipe comes together in under 30 minutes.`,
      ingredients: [
        { name: 'pasta', quantity: '400', unit: 'g' },
        { name: mainIngredient, quantity: '300', unit: 'g' },
        { name: 'olive oil', quantity: '3', unit: 'tbsp' },
        { name: 'garlic', quantity: '4', unit: 'cloves' },
        { name: 'parmesan cheese', quantity: '50', unit: 'g' },
        { name: 'salt', quantity: 'to taste', unit: '' }
      ],
      instructions: [
        { step: 1, instruction: `Cook pasta according to package directions until al dente.` },
        { step: 2, instruction: `While pasta cooks, heat olive oil in a pan and cook ${mainIngredient} with garlic.` },
        { step: 3, instruction: `Drain pasta, reserving some pasta water.` },
        { step: 4, instruction: `Combine pasta with ${mainIngredient} mixture, add pasta water if needed, and top with parmesan cheese.` }
      ],
      cuisine: 'Italian',
      difficulty: 'Easy',
      cookingTime: 25,
      servings: 4,
      tags: ['pasta', 'italian', 'comfort-food']
    }
  ];

  return recipes.slice(0, 3);
};

module.exports = { generateFallbackRecipes };

