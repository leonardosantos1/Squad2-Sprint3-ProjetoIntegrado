const router = require('express').Router()
const itemController = require("../controllers/ItemController")
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')
const passport = require('passport')


router.get("/listar",itemController.listarItens)
router.get("/buscar/:id",itemController.listarItem)
router.post('/inserir',passport.authenticate('bearer',{session:false}),itemController.inserirItem)
router.put('/atualizar/:id',passport.authenticate('bearer',{session:false}),itemController.atualizarItem)
router.delete("/deletar/:id",passport.authenticate('bearer',{session:false}),itemController.deletarItem)

module.exports = router

