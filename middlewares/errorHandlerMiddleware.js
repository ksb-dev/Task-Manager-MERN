const { CustomAPIError } = require('../errors/customError')

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  return res.status(err.statusCode).json({ message: err.message })
}

module.exports = errorHandlerMiddleware

// const { StatusCodes } = require('http-status-codes')

// const errorHandlerMiddleware = (err, req, res, next) => {
//   console.log(err.name)
//   let customError = {
//     // set default
//     statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
//     msg: err.message || 'Something went wrong try again later'
//   }

//   if (err.name === 'ValidationError') {
//     customError.msg = Object.values(err.errors)
//       .map(item => item.message)
//       .join(',')
//     customError.statusCode = 400

//     console.log(1)
//   }

//   if (err.code && err.code === 11000) {
//     customError.msg = `Duplicate value entered for ${Object.keys(
//       err.keyValue
//     )} field, please choose another value`
//     customError.statusCode = 400

//     console.log(2)
//   }

//   if (err.name === 'CastError') {
//     customError.msg = `No item found with id : ${err.value}`
//     customError.statusCode = 404

//     console.log(3)
//   }

//   if (err instanceof CustomAPIError) {
//     return res.status(err.statusCode).json({ msg: err.message })
//   }

//   //return res.status(err.status).json({ msg: err.msg })
//   return res.status(customError.statusCode).json({ msg: customError.msg })
// }

// module.exports = errorHandlerMiddleware
