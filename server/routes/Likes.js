const express = require('express')
const router = express.Router()

//From Controllers
const {
  PostLike,
  GetLikes,
  GetLikesByUser,
} = require('../controllers/Likes.js')

//Routers
router.post('/', PostLike)
router.get('/:PostId', GetLikes)
router.get('/user/:UserId', GetLikesByUser)

module.exports = router
