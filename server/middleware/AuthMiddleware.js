const { sign, verify } = require('jsonwebtoken')

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    process.env.SECRET_TOKEN,
  )

  return accessToken
}

const validateToken = (req, res, next) => {
  const accessToken = req.cookies['access-token']

  //Check if there is accessToken/cookies
  if (!accessToken) {
    return res.send({ error: 'User not authenticated.' })
  }

  //If there is, we verify
  try {
    const validToken = verify(accessToken, process.env.SECRET_TOKEN)

    if (validToken) {
      req.authenticated = true
      return next()
    }
  } catch (err) {
    return res.send({ error: err })
  }
}

module.exports = { createTokens, validateToken }
