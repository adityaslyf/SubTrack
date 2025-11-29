// Custom Error Response class
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message || 'Internal Server Error';
  error.statusCode = err.statusCode || 500;

  // Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}: ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Duplicate key error (e.g. unique fields)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    error = new ErrorResponse(message, 400);
  }

  // JWT Error
  if (err.name === 'JsonWebTokenError') {
    const message = 'JSON Web Token is invalid. Try again';
    error = new ErrorResponse(message, 400);
  }

  // JWT Expired Error
  if (err.name === 'TokenExpiredError') {
    const message = 'JSON Web Token is expired. Try again';
    error = new ErrorResponse(message, 400);
  }

  // Final error response
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
  });
};

export default errorMiddleware;