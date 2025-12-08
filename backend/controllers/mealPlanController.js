const { prisma } = require('../config/database');

// @desc    Create meal plan
// @route   POST /api/mealplans
// @access  Private
const createMealPlan = async (req, res) => {
  try {
    // Convert date strings to DateTime objects
    const mealPlanData = {
      name: req.body.name,
      description: req.body.description || null,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      meals: req.body.meals || [],
      userId: req.user.id
    };

    // Validate dates
    if (isNaN(mealPlanData.startDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid start date'
      });
    }
    if (isNaN(mealPlanData.endDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid end date'
      });
    }

    // Validate that all recipes exist
    if (mealPlanData.meals && Array.isArray(mealPlanData.meals)) {
      for (const meal of mealPlanData.meals) {
        if (meal.recipe) {
          const recipe = await prisma.recipe.findUnique({
            where: { id: meal.recipe }
          });
          if (!recipe) {
            return res.status(404).json({
              success: false,
              message: `Recipe with ID ${meal.recipe} not found`
            });
          }
        }
      }
    }

    const mealPlan = await prisma.mealPlan.create({
      data: mealPlanData
    });

    res.status(201).json({
      success: true,
      message: 'Meal plan created successfully',
      data: { mealPlan }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create meal plan',
      error: error.message
    });
  }
};

// @desc    Get user's meal plans
// @route   GET /api/mealplans
// @access  Private
const getMealPlans = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [mealPlans, totalResults] = await Promise.all([
      prisma.mealPlan.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      prisma.mealPlan.count({
        where: { userId: req.user.id }
      })
    ]);

    const totalPages = Math.ceil(totalResults / limitNum);

    res.json({
      success: true,
      data: {
        mealPlans,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalResults,
          limit: limitNum
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch meal plans',
      error: error.message
    });
  }
};

// @desc    Get single meal plan
// @route   GET /api/mealplans/:id
// @access  Private
const getMealPlan = async (req, res) => {
  try {
    const mealPlan = await prisma.mealPlan.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found'
      });
    }

    // Check ownership
    if (mealPlan.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { mealPlan }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch meal plan',
      error: error.message
    });
  }
};

// @desc    Update meal plan
// @route   PUT /api/mealplans/:id
// @access  Private (Owner)
const updateMealPlan = async (req, res) => {
  try {
    const mealPlan = await prisma.mealPlan.findUnique({
      where: { id: req.params.id }
    });

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found'
      });
    }

    if (mealPlan.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own meal plans'
      });
    }

    // Prepare update data with date conversion
    const updateData = { ...req.body };
    
    // Convert date strings to DateTime objects if provided
    if (req.body.startDate) {
      updateData.startDate = new Date(req.body.startDate);
      if (isNaN(updateData.startDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid start date'
        });
      }
    }
    
    if (req.body.endDate) {
      updateData.endDate = new Date(req.body.endDate);
      if (isNaN(updateData.endDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid end date'
        });
      }
    }

    // Validate recipes if provided
    if (req.body.meals && Array.isArray(req.body.meals)) {
      for (const meal of req.body.meals) {
        if (meal.recipe) {
          const recipe = await prisma.recipe.findUnique({
            where: { id: meal.recipe }
          });
          if (!recipe) {
            return res.status(404).json({
              success: false,
              message: `Recipe with ID ${meal.recipe} not found`
            });
          }
        }
      }
    }

    const updatedMealPlan = await prisma.mealPlan.update({
      where: { id: req.params.id },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Meal plan updated successfully',
      data: { mealPlan: updatedMealPlan }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update meal plan',
      error: error.message
    });
  }
};

// @desc    Delete meal plan
// @route   DELETE /api/mealplans/:id
// @access  Private (Owner)
const deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await prisma.mealPlan.findUnique({
      where: { id: req.params.id }
    });

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found'
      });
    }

    if (mealPlan.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own meal plans'
      });
    }

    await prisma.mealPlan.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Meal plan deleted successfully'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete meal plan',
      error: error.message
    });
  }
};

module.exports = {
  createMealPlan,
  getMealPlans,
  getMealPlan,
  updateMealPlan,
  deleteMealPlan
};
