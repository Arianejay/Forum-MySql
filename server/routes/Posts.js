const express = require('express')
const router = express.Router()

// From Controllers
const {
  PostQuestion,
  GetQuestion,
  GetQuestionById,
} = require('../controllers/Posts.js')

// Routers
router.post('/', PostQuestion)
router.get('/', GetQuestion)
router.get('/:id', GetQuestionById)

module.exports = router
