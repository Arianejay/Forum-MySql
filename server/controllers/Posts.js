const express = require('express')

// Models
const { Posts, Likes } = require('../models')

// Middlewares
const { validateToken } = require('../middleware/AuthMiddleware.js')

// Controllers
const PostQuestion =
  (validateToken,
  async (req, res) => {
    const post = req.body
    try {
      await Posts.create(post)
      return res.send(post)
    } catch (err) {
      return res.send(err)
    }
  })

const GetQuestion = async (req, res) => {
  try {
    //Includes the Likes in the Posts array data
    const listQuestion = await Posts.findAll({ include: [Likes] })
    return res.send(listQuestion)
  } catch (err) {
    return res.send(err)
  }
}

const GetQuestionById = async (req, res) => {
  const id = req.params.id //PostId
  try {
    // Find by PrimaryKey (Pk)
    const post = await Posts.findByPk(id)
    return res.send(post)
  } catch (err) {
    return res.send(err)
  }
}

const GetQuestionByUser = async (req, res) => {
  const id = req.params.id //UserId
  try {
    const userPost = await Posts.findAll({ where: { UserId: id } })
    return res.send(userPost)
  } catch (err) {
    return res.send(err)
  }
}

const DeleteQuestion =
  (validateToken,
  async (req, res) => {
    const id = req.params.id //PostId
    try {
      await Posts.destroy({ where: { id } })
      return res.send('Deleted!')
    } catch (err) {
      return res.send(err)
    }
  })

const UpdateQuestion =
  (validateToken,
  async (req, res) => {
    const { title, question } = req.body
    const { id } = req.params
    try {
      await Posts.update({ title, question }, { where: { id } })
      return res.send('Updated!')
    } catch (err) {
      return res.send(err)
    }
  })

module.exports = {
  PostQuestion,
  GetQuestion,
  GetQuestionById,
  GetQuestionByUser,
  DeleteQuestion,
  UpdateQuestion,
}
