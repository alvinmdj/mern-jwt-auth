const mongoose = require('mongoose')

const databaseConnection = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  
  console.log("Connected to MongoDB Atlas")
}

module.exports = databaseConnection