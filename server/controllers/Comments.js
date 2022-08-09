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
    try {
      await Comments.create(comment)
      return res.send(comment)
    } catch (err) {
      return res.send(err)
    }
  })

const GetComment = async (req, res) => {
  const postId = req.params.postId
  try {
    const comments = await Comments.findAll({ where: { PostId: postId } })
    return res.send(comments)
  } catch (err) {
    return res.send(err)
  }
}

const GetCommentByUser = async (req, res) => {
  const id = req.params.id
  try {
    const userComment = await Comments.findAll({ where: { UserId: id } })
    return res.send(userComment)
  } catch (err) {
    return res.send(err)
  }
}

const DeleteComment =
  (validateToken,
  async (req, res) => {
    const commentId = req.params.commentId
    try {
      await Comments.destroy({ where: { id: commentId } })
      return res.send('Comment Deleted.')
    } catch (err) {
      return res.send(err)
    }
  })

module.exports = { PostComment, GetComment, DeleteComment, GetCommentByUser }
