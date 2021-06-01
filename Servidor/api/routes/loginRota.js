const router = require('express').Router()
const loginController = require('../controllers/LoginController')

router.get('/login')
router.post('/criarLogin',loginController.criarLogin)
module.exports = router