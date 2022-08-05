const express = require('express')
const router = express.Router()

// From Controllers
const {
  PostComment,
  GetComment,
  DeleteComment,
} = require('../controllers/Comments.js')

// Routers
router.post('/', PostComment)
router.get('/:postId', GetComment)
router.delete('/:commentId', DeleteComment)

module.exports = router
