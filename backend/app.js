const express = require('express')
const connectDB = require('./config/db')
const routes = require('./routes/route')

const app = express()

require('dotenv').config()
app.use(express.json())

connectDB()

app.get('', (req, res) => {
  res.send('Here is my profile')
})
app.use('/api', routes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})