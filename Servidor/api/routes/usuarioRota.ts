import {Router} from 'express'
const router =  Router()
import usuarioController from '../controllers/UsuarioController'
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get('/',usuarioController.listarUsuarios)
router.get('/:id',middlewaresAutenticacao.bearer,usuarioController.listarUsuario)
router.post('/',usuarioController.inserirUsuario)
router.put("/:id",middlewaresAutenticacao.bearerAdm,usuarioController.atualizarUsuario)
router.delete("/:id",middlewaresAutenticacao.bearerAdm,usuarioController.deletarUsuario)

export default router