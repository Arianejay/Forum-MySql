const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')

// Model
const db = require('./models')

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())

// Routers
const UsersRouter = require('./routes/Users.js')
const PostsRouter = require('./routes/Posts.js')

app.use('/auth', UsersRouter)
app.use('/post', PostsRouter)

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })
})
