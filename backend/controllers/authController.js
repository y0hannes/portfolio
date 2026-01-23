const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH
const JWT_SECRET = process.env.JWT_SECRET

const login = async (req, res) => {

  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ err: 'Please provide username and password' })
  }
  const isUsernameValid = username === ADMIN_USERNAME
  const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)

  if (!isUsernameValid || !isPasswordValid) {
    return res.status(400).json({ err: 'Invalid credentials' })
  }

  const payload = { user: { id: 'admin' } }

  jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' },
    (err, token) => {
      if (err) {
        return res.status(500).json({ err: 'Server error' })
      }
      res.json({ token })
    }
  )
}

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ err: 'Missing or invalid token' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (err) {
    return res.status(401).json({ err: 'Token is not valid' })
  }
}

module.exports = { login, authenticateAdmin }