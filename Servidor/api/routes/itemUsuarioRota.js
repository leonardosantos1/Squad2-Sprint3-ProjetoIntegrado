const router = require('express').Router()
const itemUsuarioController = require("../controllers/ItemUsuarioController")
const passport = require('passport')

router.get("/listar",itemUsuarioController.listarItensUsuario)
router.get("/buscar/:id",itemUsuarioController.listarItemUsuario)
router.post('/inserir',passport.authenticate('bearer',{session:false}),itemUsuarioController.inserirItemUsuario)
router.put('/atualizar/:id',passport.authenticate('bearer',{session:false}),itemUsuarioController.atualizarItemUsuario)
router.delete("/deletar/:id",passport.authenticate('bearer',{session:false}),itemUsuarioController.deletarItemUsuario)


module.exports = router