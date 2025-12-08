// Error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Prisma errors
  // P2002: Unique constraint violation
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'field';
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    error = { message, statusCode: 400 };
  }

  // P2025: Record not found
  if (err.code === 'P2025') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // P2003: Foreign key constraint violation
  if (err.code === 'P2003') {
    const message = 'Invalid reference to related resource';
    error = { message, statusCode: 400 };
  }

  // Validation errors (from express-validator)
  if (err.name === 'ValidationError' || Array.isArray(err.errors)) {
    const message = err.errors?.map(e => e.msg || e.message).join(', ') || err.message;
    error = { message, statusCode: 400 };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack, error: err })
  });
};

module.exports = errorHandler;

