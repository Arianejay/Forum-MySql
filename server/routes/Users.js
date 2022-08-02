const express = require('express')

// From Controllers
const { PostRegister, PostLogin } = require('../controllers/Users.js')

const router = express.Router()

// Routers
router.post('/register', PostRegister)
router.post('/login', PostLogin)

module.exports = router
