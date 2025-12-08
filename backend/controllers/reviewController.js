const { prisma } = require('../config/database');

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { recipeId, rating, comment } = req.body;

    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId }
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if user already reviewed
    const existingReview = await prisma.review.findFirst({
      where: {
        recipeId,
        userId: req.user.id
      }
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this recipe'
      });
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        recipeId,
        userId: req.user.id,
        rating,
        comment
      },
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

    // Update recipe rating
    const ratings = Array.isArray(recipe.ratings) ? recipe.ratings : [];
    const ratingIndex = ratings.findIndex(r => r.user === req.user.id);

    if (ratingIndex >= 0) {
      ratings[ratingIndex].rating = rating;
    } else {
      ratings.push({
        user: req.user.id,
        rating
      });
    }

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = (sum / ratings.length).toFixed(1);

    await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        ratings,
        averageRating: parseFloat(averageRating),
        reviewCount: ratings.length
      }
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: { review }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create review',
      error: error.message
    });
  }
};

// @desc    Get reviews for a recipe
// @route   GET /api/reviews/recipe/:recipeId
// @access  Public
const getRecipeReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [reviews, totalResults] = await Promise.all([
      prisma.review.findMany({
        where: { recipeId: req.params.recipeId },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      }),
      prisma.review.count({
        where: { recipeId: req.params.recipeId }
      })
    ]);

    const totalPages = Math.ceil(totalResults / limitNum);

    res.json({
      success: true,
      data: {
        reviews,
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
      message: 'Failed to fetch reviews',
      error: error.message
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private (Owner)
const updateReview = async (req, res) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: req.params.id }
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own reviews'
      });
    }

    const updatedReview = await prisma.review.update({
      where: { id: req.params.id },
      data: {
        rating: req.body.rating || review.rating,
        comment: req.body.comment || review.comment
      },
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

    // Update recipe rating
    const recipe = await prisma.recipe.findUnique({
      where: { id: review.recipeId }
    });

    if (recipe) {
      const ratings = Array.isArray(recipe.ratings) ? recipe.ratings : [];
      const ratingIndex = ratings.findIndex(r => r.user === req.user.id);
      
      if (ratingIndex >= 0) {
        ratings[ratingIndex].rating = updatedReview.rating;
        const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
        const averageRating = (sum / ratings.length).toFixed(1);
        
        await prisma.recipe.update({
          where: { id: review.recipeId },
          data: {
            ratings,
            averageRating: parseFloat(averageRating)
          }
        });
      }
    }

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: { review: updatedReview }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update review',
      error: error.message
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private (Owner/Admin)
const deleteReview = async (req, res) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: req.params.id }
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own reviews'
      });
    }

    // Update recipe rating
    const recipe = await prisma.recipe.findUnique({
      where: { id: review.recipeId }
    });

    if (recipe) {
      const ratings = Array.isArray(recipe.ratings) 
        ? recipe.ratings.filter(r => r.user !== review.userId)
        : [];

      if (ratings.length > 0) {
        const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
        const averageRating = (sum / ratings.length).toFixed(1);
        
        await prisma.recipe.update({
          where: { id: review.recipeId },
          data: {
            ratings,
            averageRating: parseFloat(averageRating),
            reviewCount: ratings.length
          }
        });
      } else {
        await prisma.recipe.update({
          where: { id: review.recipeId },
          data: {
            ratings: [],
            averageRating: 0,
            reviewCount: 0
          }
        });
      }
    }

    await prisma.review.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete review',
      error: error.message
    });
  }
};

module.exports = {
  createReview,
  getRecipeReviews,
  updateReview,
  deleteReview
};
