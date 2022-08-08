const express = require('express')

// Models
const { Users } = require('../models')

// Bcrypt, cookie-parser, & tokens
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const {
  createTokens,
  validateToken,
} = require('../middleware/AuthMiddleware.js')

// Controllers
const PostRegister = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await Users.findOne({ where: { username } })

    if (user) {
      return res.send({ error: 'User already exist.' })
    }

    try {
      // Create a username and hashed password
      bcrypt.hash(password, 10).then((hash) => {
        Users.create({ username, password: hash })
        return res.send('Registered')
      })
    } catch (err) {
      return res.send(err)
    }
  } catch (err) {
    return res.send(err)
  }
}

const PostLogin = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await Users.findOne({ where: { username } })

    // Check if there is username
    if (!user) {
      return res.send({ error: "Error, user doesn't exist." })
    }

    // If there is username, compare the password to the user password
    bcrypt.compare(password, user.password).then((match) => {
      // Check password if match
      if (!match) {
        return res.send({
          error: 'Error, your username or password is incorrect.',
        })
      } else {
        // Create a token that has an expiry of 24hrs
        const accessToken = createTokens(user)
        res.cookie('access-token', accessToken, {
          maxAge: 60 * 60 * 24 * 1000, // 24hrs
          // httpOnly: true,
        })

        const { password, ...others } = user.dataValues
        return res.send(others)
      }
    })
  } catch (err) {
    return res.send(err)
  }
}

module.exports = { PostRegister, PostLogin }
