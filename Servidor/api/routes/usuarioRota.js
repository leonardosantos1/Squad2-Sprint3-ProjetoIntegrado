const router = require('express').Router()
const usuarioController = require('../controllers/UsuarioController')
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get('/listar',usuarioController.listarUsuarios)
router.get('/buscar/:id',usuarioController.listarUsuario)
router.post('/inserir',usuarioController.inserirUsuario)
router.put("/atualizar/:id",middlewaresAutenticacao.bearer,usuarioController.atualizarUsuario)
router.delete("/deletar/:id",middlewaresAutenticacao.bearer,usuarioController.deletarUsuario)

module.exports = router