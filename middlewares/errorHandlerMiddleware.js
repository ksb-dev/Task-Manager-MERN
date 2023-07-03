const { CustomAPIError } = require('../errors/customError')

const errorHandlerMiddleware = (err, req, res, next) => {
  //console.log(err)
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  return res.status(err.statusCode).json({ message: err.message })
}

module.exports = errorHandlerMiddleware
