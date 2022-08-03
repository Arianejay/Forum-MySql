const express = require('express')
const router = express.Router()

// From Controllers
const { PostRegister, PostLogin } = require('../controllers/Users.js')

// Routers
router.post('/register', PostRegister)
router.post('/login', PostLogin)

module.exports = router
