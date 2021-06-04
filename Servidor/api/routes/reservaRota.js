const router = require('express').Router()
const reservaController = require('../controllers/ReservaController')
const passport = require('passport')

router.get('/listar',reservaController.listarReservas)
router.get('/buscar/:id',reservaController.listarReserva)
router.post('/inserir',passport.authenticate('bearer',{session:false}), reservaController.inserirReserva)
router.put("/atualizar/:id",passport.authenticate('bearer',{session:false}),reservaController.atualizarReserva)
router.delete("/deletar/:id",passport.authenticate('bearer',{session:false}),reservaController.deletarReserva)

module.exports = router