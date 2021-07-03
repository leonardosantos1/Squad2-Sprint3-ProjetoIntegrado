import {Router} from 'express'
const router = Router()
import loginController from '../controllers/LoginController'
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get('/',loginController.listar)
router.post('/entrar',middlewaresAutenticacao.local,loginController.login )
router.post('/',loginController.criarLogin)
router.post('/admin'/*,middlewaresAutenticacao.bearerAdm*/,loginController.criarLoginAdm)
router.put('/:id',middlewaresAutenticacao.bearer,loginController.atualizarLogin)

export default router