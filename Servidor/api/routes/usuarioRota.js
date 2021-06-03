const router = require('express').Router()
const usuarioController = require('../controllers/UsuarioController')

router.get('/listar',usuarioController.listarUsuarios)
router.get('/buscar/:id',usuarioController.listarUsuario)
router.post('/inserir', usuarioController.inserirUsuario)
router.put("/atualizar/:id",usuarioController.atualizarUsuario)
router.delete("/deletar/:id",usuarioController.deletarUsuario)

module.exports = router