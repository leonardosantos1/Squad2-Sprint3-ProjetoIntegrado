const router = require('express').Router()
const reservaController = require('../controllers/ReservaController')

router.get('/listar',reservaController.listarReservas)
router.get('/buscar/:id',reservaController.listarReserva)
router.post('/inserir', reservaController.inserirReserva)
router.put("/atualizar/:id",reservaController.atualizarReserva)
router.delete("/deletar/:id",reservaController.deletarReserva)

module.exports = router