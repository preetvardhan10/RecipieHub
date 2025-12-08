const { prisma } = require('../config/database');

// @desc    Get all recipes with filtering, searching, sorting, pagination
// @route   GET /api/recipes
// @access  Public
const getRecipes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      cuisine,
      difficulty,
      maxCookingTime,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build where clause
    const where = {};

    // Filter by cuisine
    if (cuisine) {
      where.cuisine = { contains: cuisine, mode: 'insensitive' };
    }

    // Filter by difficulty
    if (difficulty) {
      where.difficulty = difficulty;
    }

    // Filter by cooking time
    if (maxCookingTime) {
      where.cookingTime = { lte: parseInt(maxCookingTime) };
    }

    // Search by name, description
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Sorting
    let orderBy = {};
    if (sortBy === 'rating') {
      orderBy = { averageRating: sortOrder === 'asc' ? 'asc' : 'desc' };
    } else if (sortBy === 'cookingTime') {
      orderBy = { cookingTime: sortOrder === 'asc' ? 'asc' : 'desc' };
    } else if (sortBy === 'dateAdded') {
      orderBy = { createdAt: sortOrder === 'asc' ? 'asc' : 'desc' };
    } else {
      orderBy = { createdAt: sortOrder === 'asc' ? 'asc' : 'desc' };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const [recipes, totalResults] = await Promise.all([
      prisma.recipe.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              avatar: true
            }
          }
        },
        orderBy,
        skip,
        take: limitNum
      }),
      prisma.recipe.count({ where })
    ]);

    const totalPages = Math.ceil(totalResults / limitNum);

    res.json({
      success: true,
      data: {
        recipes,
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
      message: 'Failed to fetch recipes',
      error: error.message
    });
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
const getRecipe = async (req, res) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
            bio: true
          }
        }
      }
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Get reviews
    const reviews = await prisma.review.findMany({
      where: { recipeId: recipe.id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: {
        recipe,
        reviews
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recipe',
      error: error.message
    });
  }
};

// @desc    Create recipe
// @route   POST /api/recipes
// @access  Private
const createRecipe = async (req, res) => {
  try {
    const recipeData = {
      ...req.body,
      authorId: req.user.id
    };

    const recipe = await prisma.recipe.create({
      data: recipeData,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: { recipe }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create recipe',
      error: error.message
    });
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private (Owner/Admin)
const updateRecipe = async (req, res) => {
  try {
    const recipe = await prisma.recipe.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Recipe updated successfully',
      data: { recipe }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update recipe',
      error: error.message
    });
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private (Owner/Admin)
const deleteRecipe = async (req, res) => {
  try {
    // Delete associated reviews first (cascade should handle this, but being explicit)
    await prisma.review.deleteMany({
      where: { recipeId: req.params.id }
    });

    // Remove from user favorites
    const usersWithFavorite = await prisma.user.findMany({
      where: { favorites: { has: req.params.id } }
    });

    for (const user of usersWithFavorite) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          favorites: {
            set: user.favorites.filter(id => id !== req.params.id)
          }
        }
      });
    }

    // Delete the recipe
    await prisma.recipe.delete({
      where: { id: req.params.id }
    });

    res.json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete recipe',
      error: error.message
    });
  }
};

// @desc    Rate recipe
// @route   POST /api/recipes/:id/rate
// @access  Private
const rateRecipe = async (req, res) => {
  try {
    const { rating } = req.body;
    const recipe = await prisma.recipe.findUnique({
      where: { id: req.params.id }
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Get current ratings array
    const ratings = Array.isArray(recipe.ratings) ? recipe.ratings : [];

    // Check if user already rated
    const existingRatingIndex = ratings.findIndex(
      r => r.user === req.user.id
    );

    if (existingRatingIndex >= 0) {
      // Update existing rating
      ratings[existingRatingIndex].rating = rating;
    } else {
      // Add new rating
      ratings.push({
        user: req.user.id,
        rating
      });
    }

    // Recalculate average rating
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = (sum / ratings.length).toFixed(1);

    const updatedRecipe = await prisma.recipe.update({
      where: { id: req.params.id },
      data: {
        ratings,
        averageRating: parseFloat(averageRating),
        reviewCount: ratings.length
      }
    });

    res.json({
      success: true,
      message: 'Recipe rated successfully',
      data: { recipe: updatedRecipe }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to rate recipe',
      error: error.message
    });
  }
};

// @desc    Add to favorites
// @route   POST /api/recipes/:id/favorite
// @access  Private
const toggleFavorite = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    const recipeId = req.params.id;
    const favorites = user.favorites || [];
    const isFavorite = favorites.includes(recipeId);

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        favorites: isFavorite
          ? { set: favorites.filter(id => id !== recipeId) }
          : { set: [...favorites, recipeId] }
      }
    });

    res.json({
      success: true,
      message: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      data: { isFavorite: !isFavorite }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update favorites',
      error: error.message
    });
  }
};

// @desc    Search recipes
// @route   GET /api/recipes/search
// @access  Public
const searchRecipes = async (req, res) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const where = {
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } }
      ]
    };

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [recipes, totalResults] = await Promise.all([
      prisma.recipe.findMany({
        where,
        include: {
          author: {
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
      prisma.recipe.count({ where })
    ]);

    const totalPages = Math.ceil(totalResults / limitNum);

    res.json({
      success: true,
      data: {
        recipes,
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
      message: 'Search failed',
      error: error.message
    });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  rateRecipe,
  toggleFavorite,
  searchRecipes
};
