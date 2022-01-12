const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')

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
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return next(new ErrorResponse("Failed to send email"), 404)
    }

    const resetToken = user.getResetPasswordToken()

    await user.save()

    const resetUrl = `${process.env.URL}/resetpassword/${resetToken}`

    const message = `
      <h1>You have requested to reset your password</h1>
      <p>Click this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: "Password reset request",
        message: message
      })

      res.status(200).json({ success: true, data: "Email sent successfully" })

    } catch (err) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      return next(new ErrorResponse("Failed to send email", 500))
    }
    
  } catch (err) {
    next(new ErrorResponse("Failed to send email", 500))
  }
}

// Reset password controller
exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
      return next(new ErrorResponse("Invalid token for password reset", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(201).json({
      success: true,
      data: "Password reset successfully"
    })

  } catch (err) {
    next(err)
  }
}

// Send token to json
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({ success: true, token })
}