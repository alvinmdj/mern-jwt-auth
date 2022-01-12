const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide an username"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false // prevent password from being retrieved by default when calling UserSchema
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
})

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Method to compare password from post body with the password stored in db
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// Method to get signed token (token signed with user id)
UserSchema.methods.getSignedToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  )
}

const User = mongoose.model("User", UserSchema)

module.exports = User