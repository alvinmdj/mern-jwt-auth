const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    const user = await User.create({
      username, email, password
    })

    res.status(201).json({
      success: true, user
    })

  } catch (err) {
    // Use error handler middleware
    next(err)

    // res.status(500).json({
    //   success: false,
    //   error: err.message
    // })
  }
}

exports.login = async (req, res, next) => {
  const { email, password} = req.body

  if(!email || !password) {
    // Use error handler middleware
    return next(new ErrorResponse("Please provide both email and password", 400))

    // res.status(400).json({
    //   success: false,
    //   error: "Please provide both email and password"
    // })
  }

  try {
    const user = await User.findOne({ email }).select('+password')

    if(!user) {
      // Use error handler middleware
      return next(new ErrorResponse("Invalid credentials", 401))

      // res.status(401).json({
      //   success: false,
      //   error: "Invalid credentials"
      // })
    }

    const isMatch = await user.matchPassword(password)

    if(!isMatch) {
      // Use error handler middleware
      return next(new ErrorResponse("Invalid credentials", 401))

      // res.status(401).json({
      //   success: false,
      //   error: "Invalid credentials"
      // })
    }

    res.status(200).json({
      success: true,
      token: "somerandomtokenbeforeworkingwithjwt"
    })

  } catch (err) {
    // Use error handler middleware
    next(err)
    
    // res.status(500).json({
    //   success: false,
    //   error: err.message
    // })
  }
}

exports.forgotPassword = (req, res, next) => {
  res.send("Forgot Password Route")
}

exports.resetPassword = (req, res, next) => {
  res.send("Reset Password Route")
}