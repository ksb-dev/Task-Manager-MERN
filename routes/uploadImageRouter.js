const express = require('express')
const router = express.Router()

const {
  uploadProfilePictureLocal,
  uploadProfilePictureCloud
} = require('../controllers/uploadImageController')

router.route('/local').post(uploadProfilePictureLocal)
router.route('/cloud').post(uploadProfilePictureCloud)

module.exports = router
