const router = require('express').Router()
const reservaController = require('../controllers/ReservaController')
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get('/listar',reservaController.listarReservas)
router.get('/buscar/:id',reservaController.listarReserva)
router.post('/inserir',middlewaresAutenticacao.bearer, reservaController.inserirReserva)
router.put("/atualizar/:id",middlewaresAutenticacao.bearer,reservaController.atualizarReserva)
router.delete("/deletar/:id",middlewaresAutenticacao.bearer,reservaController.deletarReserva)

module.exports = router