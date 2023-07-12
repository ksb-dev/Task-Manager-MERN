const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { createJWT } = require('../utils')

const register = async (req, res) => {
  const { name, email, password, image } = req.body

  console.log(image)

  //Check empty fields
  if (!name || !email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please fill out all the fields.' })
    return
  }

  if (name.length < 3) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'User name should be minimum 3 characters' })
    return
  }

  if (name.length > 15) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'User name can not be more than 15 characters' })
    return
  }

  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please provide an valid email' })
    return
  }

  if (password === undefined || password === '' || password.length < 6) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Password length should be minimum 6 characters' })
    return
  }

  // Check if email already exists
  const isEmailExists = await User.findOne({ email })

  if (isEmailExists) {
    res.status(StatusCodes.CONFLICT).json({ message: 'Email already exists' })
    return
  }

  // Register user
  const user = await User.create({ name, email, password, image })

  // Generate token
  const tokenUser = { name: user.name, id: user._id }

  const token = createJWT({ res, payload: tokenUser })

  // Send user response
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token, image: user.image })
}

const login = async (req, res) => {
  const { email, password } = req.body

  // Check empty fields
  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please fill out all the fields.' })
    return
  }

  // Check if entered email exists
  const user = await User.findOne({ email })

  if (!user) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'This email does not exist' })
    return
  }

  // Check if entered password is valid
  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect password' })
    return
  }

  // Generate token
  const tokenUser = { name: user.name, id: user._id }

  const token = createJWT({ res, payload: tokenUser })

  // Send user response
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name }, token, image: user.image })
}

module.exports = { register, login }
