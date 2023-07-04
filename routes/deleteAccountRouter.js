const express = require('express')
const router = express.Router()

const {
  deleteAccountController
} = require('../controllers/deleteAccountController')

router.route('/').get(deleteAccountController)

module.exports = router
