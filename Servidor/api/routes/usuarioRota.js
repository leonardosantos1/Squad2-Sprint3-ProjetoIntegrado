const router = require('express').Router()
const usuarioController = require('../controllers/UsuarioController')
const passport = require('passport')

router.get('/listar',usuarioController.listarUsuarios)
router.get('/buscar/:id',usuarioController.listarUsuario)
router.post('/inserir',usuarioController.inserirUsuario)
router.put("/atualizar/:id",passport.authenticate('bearer',{session:false}),usuarioController.atualizarUsuario)
router.delete("/deletar/:id",passport.authenticate('bearer',{session:false}),usuarioController.deletarUsuario)

module.exports = router