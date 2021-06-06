const router = require('express').Router()
const loginController = require('../controllers/LoginController')
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get('/listar',loginController.listar)
router.post('/entrar',middlewaresAutenticacao.local,loginController.login )
router.post('/criar',loginController.criarLogin)
router.put('/atualizar/:id',middlewaresAutenticacao.bearer,loginController.atualizarLogin)//tratar senha

module.exports = router