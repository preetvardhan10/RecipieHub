const express = require('express');
const router = express.Router();
const {
  createMealPlan,
  getMealPlans,
  getMealPlan,
  updateMealPlan,
  deleteMealPlan
} = require('../controllers/mealPlanController');
const { validateMealPlan } = require('../middlewares/validator');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, validateMealPlan, createMealPlan);
router.get('/', authenticate, getMealPlans);
router.get('/:id', authenticate, getMealPlan);
router.put('/:id', authenticate, updateMealPlan);
router.delete('/:id', authenticate, deleteMealPlan);

module.exports = router;

