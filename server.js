if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: "./config.env" })
}

const express = require('express')
const databaseConnection = require('./config/db')
const authRoutes = require('./routes/auth')
const dashboardRoutes = require('./routes/dashboard')
const errorHandler = require('./middlewares/error')

// Connect with MongoDB Atlas
databaseConnection()

const app = express()

// Middlewares 
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use(errorHandler) // error handler must be placed as last middleware


// Run server
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Handle unhandled rejection error
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`)

  server.close(() => process.exit(1))
})