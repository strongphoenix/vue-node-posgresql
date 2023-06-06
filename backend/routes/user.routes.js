const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')

router.post('/', controller.index)
router.post('/getuser', controller.getuser)
router.post('/deluser', controller.deluser)
router.post('/edituser', controller.edituser)

module.exports = router
