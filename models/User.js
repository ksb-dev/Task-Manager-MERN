const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50
  },

  email: {
    type: String,
    unique: true
  },

  password: {
    type: String
  }
})

// Mongoose middleware for Hashing Password using "bcryptjs"
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  //next()

  // In mongoose 5.x, instead of calling next() manually, you can use a function that returns a promise. In particular, you can use async/await.
})

// Create json web token
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME
    }
  )
}

// Compare password
UserSchema.methods.comparePassword = async function (sentPassword) {
  const isMatch = await bcrypt.compare(sentPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
