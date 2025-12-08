const express = require('express');
const { MealPlan, Recipe } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user's meal plans
router.get('/', authenticateToken, async (req, res) => {
  try {
    const mealPlans = await MealPlan.findAll({
      where: { userId: req.user.userId },
      order: [['weekStartDate', 'DESC']],
      include: []
    });

    // Populate recipe details for each meal
    const mealPlansWithRecipes = await Promise.all(
      mealPlans.map(async (plan) => {
        const meals = await Promise.all(
          (plan.meals || []).map(async (meal) => {
            if (meal.recipe) {
              const recipe = await Recipe.findByPk(meal.recipe);
              return { ...meal, recipe };
            }
            return meal;
          })
        );
        return { ...plan.toJSON(), meals };
      })
    );

    res.json(mealPlansWithRecipes);
  } catch (error) {
    console.error('Get meal plans error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create meal plan
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { weekStartDate, meals } = req.body;

    const mealPlan = await MealPlan.create({
      userId: req.user.userId,
      weekStartDate,
      meals: meals || []
    });

    // Populate recipe details
    const mealsWithRecipes = await Promise.all(
      ((mealPlan.meals || [])).map(async (meal) => {
        if (meal.recipe) {
          const recipe = await Recipe.findByPk(meal.recipe);
          return { ...meal, recipe };
        }
        return meal;
      })
    );

    res.status(201).json({ ...mealPlan.toJSON(), meals: mealsWithRecipes });
  } catch (error) {
    console.error('Create meal plan error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Update meal plan
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByPk(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    if (mealPlan.userId !== parseInt(req.user.userId)) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await mealPlan.update(req.body);

    // Populate recipe details
    const mealsWithRecipes = await Promise.all(
      ((mealPlan.meals || [])).map(async (meal) => {
        if (meal.recipe) {
          const recipe = await Recipe.findByPk(meal.recipe);
          return { ...meal, recipe };
        }
        return meal;
      })
    );

    res.json({ ...mealPlan.toJSON(), meals: mealsWithRecipes });
  } catch (error) {
    console.error('Update meal plan error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete meal plan
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByPk(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    if (mealPlan.userId !== parseInt(req.user.userId)) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await mealPlan.destroy();
    res.json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    console.error('Delete meal plan error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
