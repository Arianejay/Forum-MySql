const express = require('express')

// Models
const { Posts } = require('../models')

// Middlewares
const { validateToken } = require('../middleware/AuthMiddleware.js')

// Controllers
const PostQuestion =
  (validateToken,
  async (req, res) => {
    const post = req.body
    // post.username = req.user.username

    await Posts.create(post)
    return res.send(post)
  })

const GetQuestion = async (req, res) => {
  const listQuestion = await Posts.findAll()
  return res.send(listQuestion)
}

module.exports = { PostQuestion, GetQuestion }
