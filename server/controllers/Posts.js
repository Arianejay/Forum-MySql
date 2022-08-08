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

    await Posts.create(post)
    return res.send(post)
  })

const GetQuestion = async (req, res) => {
  //Includes the Likes in the Posts array data
  const listQuestion = await Posts.findAll({ include: [Likes] })
  return res.send(listQuestion)
}

const GetQuestionById = async (req, res) => {
  const id = req.params.id //PostId

  // Find by PrimaryKey (Pk)
  const post = await Posts.findByPk(id)
  return res.send(post)
}

const DeleteQuestion =
  (validateToken,
  async (req, res) => {
    const id = req.params.id //PostId
    await Posts.destroy({ where: { id } })
    return res.send('Deleted!')
  })

const UpdateQuestion =
  (validateToken,
  async (req, res) => {
    const { title, question } = req.body
    const { id } = req.params
    await Posts.update({ title, question }, { where: { id } })
    return res.send('Updated!')
  })

module.exports = {
  PostQuestion,
  GetQuestion,
  GetQuestionById,
  DeleteQuestion,
  UpdateQuestion,
}
