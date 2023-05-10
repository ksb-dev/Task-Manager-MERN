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
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Compare password
UserSchema.methods.comparePassword = async function (sentPassword) {
  const isMatch = await bcrypt.compare(sentPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
