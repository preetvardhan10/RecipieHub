const express = require('express');
const OpenAI = require('openai');
const { authenticateToken } = require('../middleware/auth');
const { Recipe, User } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// Initialize OpenAI only if API key is provided
let openai = null;
if (process.env.OPENAI_API_KEY) {
  try {
    openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
  } catch (error) {
    console.warn('OpenAI client initialization failed:', error.message);
  }
}

// Get AI recipe suggestions
router.post('/suggest', authenticateToken, async (req, res) => {
  try {
    const { ingredients, dietaryPreferences, cuisine } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients are required' });
    }

    // Build comprehensive prompt for OpenAI
    let prompt = `You are a professional chef and recipe creator. Suggest 5 creative, delicious recipes using these ingredients: ${ingredients.join(', ')}.`;
    
    if (dietaryPreferences && dietaryPreferences.length > 0) {
      prompt += ` IMPORTANT: All recipes must be ${dietaryPreferences.join(' and ')}.`;
    }
    if (cuisine) {
      prompt += ` The recipes should be ${cuisine} cuisine style.`;
    }
    
    prompt += `\n\nFor each recipe, provide a complete recipe with the following structure:
- title: A descriptive recipe name
- description: A brief, appetizing description (2-3 sentences)
- ingredients: An array of ingredient strings with quantities (e.g., ["2 cups flour", "1 lb chicken breast", "3 cloves garlic"])
- instructions: An array of step-by-step instructions (at least 5 steps)
- cookingTime: Number in minutes
- servings: Number of servings
- difficulty: One of "easy", "medium", or "hard"
- cuisine: The cuisine type

Return ONLY a valid JSON array with exactly this structure. Do not include any text before or after the JSON array. Example format:
[
  {
    "title": "Recipe Name",
    "description": "Description here",
    "ingredients": ["ingredient 1", "ingredient 2"],
    "instructions": ["step 1", "step 2"],
    "cookingTime": 30,
    "servings": 4,
    "difficulty": "medium",
    "cuisine": "Italian"
  }
]`;

    // Check if OpenAI is available
    if (!openai) {
      // Fallback to database search only
      const { ingredients } = req.body;
      if (ingredients && ingredients.length > 0) {
        const ingredientSearchTerms = ingredients.map(i => i.toLowerCase().trim());
        const ingredientConditions = ingredientSearchTerms.map(term => ({
          ingredients: {
            [Op.contains]: [{ name: { [Op.iLike]: `%${term}%` } }]
          }
        }));
        
        const similarRecipes = await Recipe.findAll({
          where: {
            [Op.or]: [
              ...ingredientConditions,
              { title: { [Op.iLike]: { [Op.any]: ingredientSearchTerms.map(t => `%${t}%`) } } },
              { description: { [Op.iLike]: { [Op.any]: ingredientSearchTerms.map(t => `%${t}%`) } } }
            ]
          },
          include: [{
            model: User,
            as: 'author',
            attributes: ['id', 'name', 'email']
          }],
          limit: 8,
          order: [['averageRating', 'DESC']]
        });

        return res.json({
          aiSuggestions: [],
          similarRecipes,
          message: 'AI service unavailable. Please set OPENAI_API_KEY environment variable for AI suggestions. Showing similar recipes from database.'
        });
      }
      return res.status(400).json({ error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional chef and recipe expert. Always respond with valid JSON arrays only. Never include markdown code blocks or any text outside the JSON. Return the recipes as a JSON array directly.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 3000
    });

    let suggestions;
    try {
      const content = completion.choices[0].message.content.trim();
      // Remove markdown code blocks if present
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Try parsing as array first
      try {
        suggestions = JSON.parse(cleanedContent);
        // If it's an object with a recipes key, extract it
        if (suggestions.recipes && Array.isArray(suggestions.recipes)) {
          suggestions = suggestions.recipes;
        } else if (!Array.isArray(suggestions)) {
          // If it's a single object, wrap in array
          suggestions = [suggestions];
        }
      } catch (e) {
        // If direct parse fails, try to extract JSON from text
        const jsonMatch = cleanedContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          suggestions = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Could not parse JSON from response');
        }
      }
      
      // Ensure it's an array
      if (!Array.isArray(suggestions)) {
        suggestions = [suggestions];
      }
      
      // Validate and clean each suggestion
      suggestions = suggestions.map(recipe => ({
        title: recipe.title || 'Untitled Recipe',
        description: recipe.description || 'A delicious recipe',
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
        cookingTime: parseInt(recipe.cookingTime) || 30,
        servings: parseInt(recipe.servings) || 4,
        difficulty: ['easy', 'medium', 'hard'].includes(recipe.difficulty?.toLowerCase()) 
          ? recipe.difficulty.toLowerCase() 
          : 'medium',
        cuisine: recipe.cuisine || cuisine || 'International'
      }));
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw response:', completion.choices[0].message.content);
      throw new Error('Failed to parse AI response. Please try again.');
    }

    // Also search database for similar recipes with better matching
    const ingredientSearchTerms = ingredients.map(i => i.toLowerCase().trim());
    
    // Build search conditions for ingredients (JSONB search)
    const ingredientConditions = ingredientSearchTerms.map(term => ({
      ingredients: {
        [Op.contains]: [{ name: { [Op.iLike]: `%${term}%` } }]
      }
    }));
    
    // Try to find recipes that match at least one ingredient
    const similarRecipes = await Recipe.findAll({
      where: {
        [Op.or]: [
          ...ingredientConditions,
          { title: { [Op.iLike]: { [Op.any]: ingredientSearchTerms.map(t => `%${t}%`) } } },
          { description: { [Op.iLike]: { [Op.any]: ingredientSearchTerms.map(t => `%${t}%`) } } }
        ]
      },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'email']
      }],
      limit: 8,
      order: [['averageRating', 'DESC']]
    });

    res.json({
      aiSuggestions: suggestions,
      similarRecipes
    });
  } catch (error) {
    console.error('AI suggestion error:', error);
    
    // Fallback: return similar recipes from database
    try {
      const { ingredients } = req.body;
      if (ingredients && ingredients.length > 0) {
        const ingredientSearchTerms = ingredients.map(i => i.toLowerCase().trim());
        const ingredientConditions = ingredientSearchTerms.map(term => ({
          ingredients: {
            [Op.contains]: [{ name: { [Op.iLike]: `%${term}%` } }]
          }
        }));
        
        const similarRecipes = await Recipe.findAll({
          where: {
            [Op.or]: [
              ...ingredientConditions,
              { title: { [Op.iLike]: { [Op.any]: ingredientSearchTerms.map(t => `%${t}%`) } } },
              { description: { [Op.iLike]: { [Op.any]: ingredientSearchTerms.map(t => `%${t}%`) } } }
            ]
          },
          include: [{
            model: User,
            as: 'author',
            attributes: ['id', 'name', 'email']
          }],
          limit: 8,
          order: [['averageRating', 'DESC']]
        });

        return res.json({
          aiSuggestions: [],
          similarRecipes,
          message: 'AI service unavailable, showing similar recipes from database'
        });
      }
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError);
    }

    res.status(500).json({ 
      error: 'AI service error. Please check your OpenAI API key or try again later.',
      details: error.message 
    });
  }
});

module.exports = router;

