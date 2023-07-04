const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
  //console.log(req.headers.authorization)
  // Check Header

  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Authentication Invalid' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // Attatch the user to the task routes
    req.user = { userId: payload.id, name: payload.name }

    next()
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Authentication Invalid' })
  }
}

module.exports = authenticationMiddleware
