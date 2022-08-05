const express = require('express')

//Models
const { Likes } = require('../models')

//Middlewares
const validateToken = require('../middleware/AuthMiddleware.js')

//Controllers
const PostLike =
  (validateToken,
  async (req, res) => {
    const { PostId, UserId } = req.body

    //find the user's like
    const found = await Likes.findOne({ where: { PostId, UserId } })

    if (found) {
      //unlike
      await Likes.destroy({ where: { PostId, UserId } })
      return res.send('Unliked')
    } else {
      //like
      await Likes.create({ PostId, UserId })
      return res.send('Liked')
    }
  })

const GetLikes = async (req, res) => {
  const { PostId } = req.body
  const likesList = await Likes.findAll({ where: { PostId } })

  return res.send(likesList)
}

module.exports = { PostLike, GetLikes }
