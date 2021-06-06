const router = require('express').Router()
const tipoController = require("../controllers/TipoController")
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')


router.get("/listar",tipoController.listarTipos)
router.get("/buscar/:id",tipoController.listarTipo)
router.post('/inserir',middlewaresAutenticacao.bearer,tipoController.inserirTipo)
router.put('/atualizar/:id',middlewaresAutenticacao.bearer,tipoController.atualizarTipo)
router.delete("/deletar/:id",middlewaresAutenticacao.bearer,tipoController.deletarTipo)


module.exports = router