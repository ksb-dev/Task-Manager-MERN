const path = require('path')
const { StatusCodes } = require('http-status-codes')
const cloudinary = require('cloudinary').v2

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
  const { image } = req.body

  await cloudinary.uploader.upload(
    image,
    {
      upload_preset: 'unsigned_uploads',
      allowed_formats: ['png', 'svg', 'jpg', 'webp', 'jpeg', 'ico', 'jfif']
    },
    function (error, result) {
      if (error) {
        console.log(error)
      }
      res.status(StatusCodes.OK).json(result)
    }
  )
}

module.exports = {
  uploadProfilePictureLocal,
  uploadProfilePictureCloud
}
