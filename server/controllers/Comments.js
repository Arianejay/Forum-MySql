const express = require('express')

// Models
const { Comments } = require('../models')

// Middlewares
const validateToken = require('../middleware/AuthMiddleware.js')

// Controllers
const PostComment =
  (validateToken,
  async (req, res) => {
    const comment = req.body

    await Comments.create(comment)
    return res.send(comment)
  })

const GetComment = async (req, res) => {
  const postId = req.params.postId
  const comments = await Comments.findAll({ where: { PostId: postId } })
  return res.send(comments)
}

const DeleteComment =
  (validateToken,
  async (req, res) => {
    const commentId = req.params.commentId
    await Comments.destroy({ where: { id: commentId } })
    return res.send('Comment Deleted.')
  })

module.exports = { PostComment, GetComment, DeleteComment }
