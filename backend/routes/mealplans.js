const express = require('express');
const MealPlan = require('../models/MealPlan');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user's meal plans
router.get('/', authenticateToken, async (req, res) => {
  try {
    const mealPlans = await MealPlan.find({ user: req.user.userId })
      .populate('meals.recipe')
      .sort({ weekStartDate: -1 });

    res.json(mealPlans);
  } catch (error) {
    console.error('Get meal plans error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create meal plan
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { weekStartDate, meals } = req.body;

    const mealPlan = new MealPlan({
      user: req.user.userId,
      weekStartDate,
      meals
    });

    await mealPlan.save();
    await mealPlan.populate('meals.recipe');

    res.status(201).json(mealPlan);
  } catch (error) {
    console.error('Create meal plan error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Update meal plan
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    if (mealPlan.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    Object.assign(mealPlan, req.body);
    await mealPlan.save();
    await mealPlan.populate('meals.recipe');

    res.json(mealPlan);
  } catch (error) {
    console.error('Update meal plan error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete meal plan
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    if (mealPlan.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await MealPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    console.error('Delete meal plan error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

