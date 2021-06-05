const router = require('express').Router()
const itemUsuarioController = require("../controllers/ItemUsuarioController")
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get("/listar",itemUsuarioController.listarItensUsuario)
router.get("/buscar/:id",itemUsuarioController.listarItemUsuario)
router.post('/inserir',middlewaresAutenticacao.bearer,itemUsuarioController.inserirItemUsuario)
router.put('/atualizar/:id',middlewaresAutenticacao.bearer,itemUsuarioController.atualizarItemUsuario)
router.delete("/deletar/:id",middlewaresAutenticacao.bearer,itemUsuarioController.deletarItemUsuario)


module.exports = router