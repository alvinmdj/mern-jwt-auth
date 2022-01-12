const res = require('express/lib/response')
const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  // Error code in Mongoose : Duplicate Key
  if (err.code === 11000) {
    const message = "Duplicate field value enter"
    error = new ErrorResponse(message, 400)
  }

  // Mongoose Error Name : Validation Error
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