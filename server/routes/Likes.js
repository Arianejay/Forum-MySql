const express = require('express')
const router = express.Router()

//From Controllers
const { PostLike, GetLikes } = require('../controllers/Likes.js')

//Routers
router.post('/', PostLike)
router.get('/', GetLikes)

module.exports = router
