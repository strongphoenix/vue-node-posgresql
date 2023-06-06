const express = require('express')
const router = express.Router()
const authorize = require('../helpers/authorize')
const userRoute = require('./user.routes')

router.use('/users', userRoute)

module.exports = router
