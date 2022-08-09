const express = require('express')
const router = express.Router()

// From Controllers
const {
  PostComment,
  GetComment,
  DeleteComment,
  GetCommentByUser,
} = require('../controllers/Comments.js')

// Routers
router.post('/', PostComment)
router.get('/:postId', GetComment)
router.get('/user/:id', GetCommentByUser)
router.delete('/:commentId', DeleteComment)

module.exports = router
