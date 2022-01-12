const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  // Error message for duplicate entry (e.g. duplicate email address -> email must be unique)
  if (err.code === 11000) {
    const message = "This email address is already registered"
    error = new ErrorResponse(message, 400)
  }

  // Error message(s) provided by UserSchema requirements (e.g. required field, etc.)
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Unknown Server Error"
  })
}

module.exports = errorHandler