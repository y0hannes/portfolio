const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const routes = require('./routes/route')

const app = express()

require('dotenv').config()
app.use(express.json())
app.use(cors({
  origin: 'https://yohannes-muluken.vercel.app/',
  methods: ["GET", "POST"],
  credentials: true
}));


connectDB()

app.use(express.static('dist'))
app.use('/api', routes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})