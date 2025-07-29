const mongoose = require('mongoose')

const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolioDB'

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
