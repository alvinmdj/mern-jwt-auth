const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

// Register controller
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    const user = await User.create({
      username, email, password
    })

    sendToken(user, 201, res)

  } catch (err) {
    // Use error handler middleware
    next(err)
  }
}

// Login controller
exports.login = async (req, res, next) => {
  const { email, password} = req.body

  if(!email || !password) {
    // Use error handler middleware
    return next(new ErrorResponse("Please provide both email and password", 400))
  }

  try {
    const user = await User.findOne({ email }).select('+password')

    if(!user) {
      // Use error handler middleware
      return next(new ErrorResponse("Invalid credentials", 401))
    }

    const isMatch = await user.matchPassword(password)

    if(!isMatch) {
      // Use error handler middleware
      return next(new ErrorResponse("Invalid credentials", 401))
    }

    sendToken(user, 200, res)

  } catch (err) {
    // Use error handler middleware
    next(err)
  }
}

// Forgot password controller
exports.forgotPassword = (req, res, next) => {
  res.send("Forgot Password Route")
}

// Reset password controller
exports.resetPassword = (req, res, next) => {
  res.send("Reset Password Route")
}

// Send token to json
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({ success: true, token })
}