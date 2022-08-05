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

const GetQuestionById = async (req, res) => {
  const id = req.params.id

  // Find by PrimaryKey (Pk)
  const post = await Posts.findByPk(id)
  return res.send(post)
}

module.exports = { PostQuestion, GetQuestion, GetQuestionById }
