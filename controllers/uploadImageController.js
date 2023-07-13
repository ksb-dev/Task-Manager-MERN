const path = require('path')
const { StatusCodes } = require('http-status-codes')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProfilePictureLocal = async (req, res) => {
  if (!req.files) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'No file uploaded' })
    return
  }

  const productImage = req.files.image

  if (!productImage.mimetype.startsWith('image')) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please upload image' })
    return
  }

  const maxSize = 1024 * 1024

  if (productImage.size > maxSize) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Please upload image smaller than 1MB' })
    return
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )

  await productImage.mv(imagePath)

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

const uploadProfilePictureCloud = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: 'file-upload'
      }
    )

    if (!result) {
      next({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Failed to upload image - 1'
      })
      return
    }

    fs.unlinkSync(req.files.image.tempFilePath)

    return res
      .status(StatusCodes.OK)
      .json({ image: { src: result.secure_url } })
  } catch (error) {
    next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Failed to upload image - 2'
    })
  }
}

module.exports = {
  uploadProfilePictureLocal,
  uploadProfilePictureCloud
}
