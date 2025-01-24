const errorHandler = (err, req, res, next) => {
  // Default error values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error for debugging in development mode
  if (process.env.NODE_ENV === 'development') {
      console.error(`[Error] ${message}`, err.stack);
  }

  res.status(statusCode).json({
      success: false,
      error: {
          message,
          details: err.details || null, // Pass additional error details if available
      },
  });
};

module.exports = { errorHandler };
