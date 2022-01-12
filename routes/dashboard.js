const express = require('express')
const router = express.Router()

const { goToDashboard } = require('../controllers/dashboard')
const { protect } = require('../middlewares/auth')

router.route('/').get(protect, goToDashboard)

module.exports = router