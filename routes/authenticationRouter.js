const express = require('express')
const router = express.Router()

const {
  register,
  login,
  deleteAccount
} = require('../controllers/authenticationController')

router.route('/register').post(register)
router.route('/login').post(login)

module.exports = router
