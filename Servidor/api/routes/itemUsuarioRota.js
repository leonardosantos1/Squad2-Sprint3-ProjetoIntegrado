const router = require('express').Router()
const itemUsuarioController = require("../controllers/ItemUsuarioController")
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')
const passport = require('passport')


router.get("/listar",itemUsuarioController.listarItensUsuario)
router.get("/buscar/:id",itemUsuarioController.listarItemUsuario)
router.post('/inserir',middlewaresAutenticacao.bearer,itemUsuarioController.inserirItemUsuario)
router.put('/atualizar/:id',passport.authenticate('bearer',{session:false}),itemUsuarioController.atualizarItemUsuario)
router.delete("/deletar/:id",passport.authenticate('bearer',{session:false}),itemUsuarioController.deletarItemUsuario)


module.exports = router