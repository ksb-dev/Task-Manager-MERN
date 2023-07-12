const express = require('express')
const router = express.Router()

const {
  uploadProfilePictureCloud
} = require('../controllers/uploadImageController')

router.route('/').post(uploadProfilePictureCloud)

module.exports = router
