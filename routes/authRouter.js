const Router = require('express')
const router = new Router()
const authController = require('../Controllers/authController')

router.post('/regist', authController.registrationUser)
router.post('/login', authController.loginUser)

module.exports = router