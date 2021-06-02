const router = require('express').Router()
const loginController = require('../controllers/LoginController')

router.post('/criar',loginController.criarLogin)
router.put('/atualizar/:id',loginController.atualizarLogin)

module.exports = router