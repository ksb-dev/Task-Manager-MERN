const { StatusCodes } = require('http-status-codes')
const Task = require('../models/Task')
const User = require('../models/User')

const deleteAccountController = async (req, res, next) => {
  try {
    const tasks = await Task.deleteMany({
      createdBy: req.user.userId
    })

    if (!tasks) {
      next({
        statusCode: StatusCodes.NOT_FOUND,
        message: ``
      })
      return
    }

    if (tasks) {
      await User.deleteOne({
        _id: req.user.userId
      })
    }

    res.status(201).json({ msg: 'Deleted Successfully' })
  } catch (error) {
    next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Failed to delete a task'
    })
  }
}

module.exports = { deleteAccountController }
