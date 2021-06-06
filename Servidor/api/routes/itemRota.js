const router = require('express').Router()
const itemController = require("../controllers/ItemController")
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')


router.get("/listar",itemController.listarItens)
router.get("/buscar/:id",itemController.listarItem)
router.post('/inserir',middlewaresAutenticacao.bearer,itemController.inserirItem)
router.put('/atualizar/:id',middlewaresAutenticacao.bearer,itemController.atualizarItem)
router.delete("/deletar/:id",middlewaresAutenticacao.bearer,itemController.deletarItem)

module.exports = router

