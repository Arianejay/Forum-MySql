const express = require('express')
const router = express.Router()

// From Controllers
const { PostQuestion, GetQuestion } = require('../controllers/Posts.js')

// Routers
router.post('/', PostQuestion)
router.get('/', GetQuestion)

module.exports = router
