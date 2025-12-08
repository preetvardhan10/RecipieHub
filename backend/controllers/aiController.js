const OpenAI = require('openai');
const { generateFallbackRecipes } = require('./aiControllerFallback');

const openai = process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('your-openai-api-key')
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null;

// @desc    Get AI recipe suggestions
// @route   POST /api/ai/suggest
// @access  Private
const suggestRecipes = async (req, res) => {
  try {
    const { ingredients, dietaryPreferences } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Ingredients are required'
      });
    }

    // Use fallback if OpenAI is not configured or quota exceeded
    const useFallback = !openai || process.env.USE_FALLBACK_AI === 'true';

    if (useFallback) {
      const fallbackRecipes = generateFallbackRecipes(ingredients, dietaryPreferences);
      return res.json({
        success: true,
        message: 'Recipe suggestions generated successfully',
        data: { recipes: fallbackRecipes }
      });
    }

    const ingredientsList = Array.isArray(ingredients) 
      ? ingredients.join(', ') 
      : ingredients;

    const dietaryInfo = dietaryPreferences 
      ? `Dietary preferences: ${dietaryPreferences}. ` 
      : '';

    const prompt = `You are a professional chef and recipe expert. Based on the following ingredients and preferences, suggest 3-5 creative and delicious recipe ideas. For each recipe, provide:
1. Recipe name
2. Brief description (2-3 sentences)
3. Main ingredients needed (list the provided ingredients plus any common pantry items)
4. Estimated cooking time
5. Difficulty level (Easy, Medium, or Hard)
6. Cuisine type
7. Number of servings
8. Brief cooking instructions (3-4 key steps)

Ingredients available: ${ingredientsList}
${dietaryInfo}

Format your response as a JSON array of objects with the following structure:
[
  {
    "title": "Recipe Name",
    "description": "Brief description",
    "ingredients": [
      {"name": "Ingredient 1", "quantity": "amount", "unit": "unit"},
      {"name": "Ingredient 2", "quantity": "amount", "unit": "unit"}
    ],
    "instructions": [
      {"step": 1, "instruction": "First step"},
      {"step": 2, "instruction": "Second step"}
    ],
    "cuisine": "Cuisine type",
    "difficulty": "Easy/Medium/Hard",
    "cookingTime": 30,
    "servings": 4,
    "tags": ["tag1", "tag2"]
  }
]

Return ONLY valid JSON, no additional text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful recipe assistant. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const responseText = completion.choices[0].message.content.trim();
    
    // Try to extract JSON from the response
    let recipes;
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      recipes = JSON.parse(cleanedResponse);
    } catch (parseError) {
      // If parsing fails, return a structured error
      return res.status(500).json({
        success: false,
        message: 'Failed to parse AI response',
        error: 'Invalid JSON response from AI'
      });
    }

    // Validate and format recipes
    if (!Array.isArray(recipes)) {
      recipes = [recipes];
    }

    // Limit to 5 recipes
    recipes = recipes.slice(0, 5);

    res.json({
      success: true,
      message: 'Recipe suggestions generated successfully',
      data: { recipes }
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Check for specific error types
    if (error.message.includes('quota') || error.message.includes('429')) {
      // Use fallback when quota is exceeded
      console.log('OpenAI quota exceeded, using fallback recipes');
      const { ingredients: reqIngredients, dietaryPreferences: reqDietary } = req.body;
      const fallbackRecipes = generateFallbackRecipes(reqIngredients, reqDietary);
      return res.json({
        success: true,
        message: 'Recipe suggestions generated successfully',
        data: { recipes: fallbackRecipes }
      });
    }
    
    if (error.message.includes('401') || error.message.includes('Incorrect API key')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid OpenAI API key',
        error: 'Please check your OPENAI_API_KEY in the .env file'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to generate recipe suggestions',
      error: error.message
    });
  }
};

module.exports = {
  suggestRecipes
};

