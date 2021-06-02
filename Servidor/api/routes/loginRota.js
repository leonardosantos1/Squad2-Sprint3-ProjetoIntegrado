const router = require('express').Router()
const loginController = require('../controllers/LoginController')


router.get('/listar',loginController.listar)
router.post('/criar',loginController.criarLogin)
router.put('/atualizar/:id',loginController.atualizarLogin)

module.exports = router