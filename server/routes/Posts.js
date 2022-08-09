const express = require('express')
const router = express.Router()

// From Controllers
const {
  PostQuestion,
  GetQuestion,
  GetQuestionById,
  DeleteQuestion,
  UpdateQuestion,
  GetQuestionByUser,
} = require('../controllers/Posts.js')

// Routers
router.post('/', PostQuestion)
router.get('/', GetQuestion)
router.get('/:id', GetQuestionById)
router.get('/user/:id', GetQuestionByUser)
router.delete('/:id', DeleteQuestion)
router.put('/:id', UpdateQuestion)

module.exports = router
