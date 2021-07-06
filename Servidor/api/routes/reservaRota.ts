import {Router} from 'express'
const router = Router()
import reservaController from '../controllers/ReservaController'
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get('/', reservaController.listarReservas)
router.get('/:id', reservaController.listarReserva)
router.post('/', middlewaresAutenticacao.bearer, reservaController.inserirReserva)
router.put("/:id", middlewaresAutenticacao.bearer, reservaController.atualizarReserva)
router.delete("/:id", middlewaresAutenticacao.bearerAdm, reservaController.deletarReserva)

export default router