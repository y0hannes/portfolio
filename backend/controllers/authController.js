const jwt = require('jsonwebtoken');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const JWT_SECRET = process.env.JWT_SECRET

const login = async (req, res) => {

  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ err: 'Please provide username and password' })
  }
  const isUsernameValid = username === ADMIN_USERNAME
  const isPasswordValid = password === ADMIN_PASSWORD

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

module.exports = login