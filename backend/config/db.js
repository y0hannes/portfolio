const mongoose = require('mongoose')
require('dotenv').config()

const dbURI = process.env.dbURI

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    const conn = await mongoose.connect(dbURI, options)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
