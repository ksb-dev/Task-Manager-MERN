const { StatusCodes } = require('http-status-codes')
const Task = require('../models/Task')
const User = require('../models/User')
const cloudinary = require('cloudinary').v2

const deleteCloudinaryAvatar = async id => {
  await cloudinary.api
    .delete_resources([`user_avatar/${id}`], {
      type: 'upload',
      resource_type: 'image'
    })
    .then(console.log)
}

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
      const user = await User.findOne({
        _id: req.user.userId
      })

      if (user) {
        const avatar_url = user.image.split('/')
        const cloudinaryAvatarId = avatar_url[avatar_url.length - 1]

        await deleteCloudinaryAvatar(
          cloudinaryAvatarId.substring(0, cloudinaryAvatarId.length - 4)
        )

        if (cloudinaryAvatarId) {
          await User.deleteOne({
            _id: req.user.userId
          })
        }
      }
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
