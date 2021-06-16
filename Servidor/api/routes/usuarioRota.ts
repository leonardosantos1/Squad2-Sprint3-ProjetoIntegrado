import {Router} from 'express'
const router =  Router()

import usuarioController from '../controllers/UsuarioController'

const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get('/',usuarioController.listarUsuarios)
router.get('/:id',usuarioController.listarUsuario)
router.post('/',usuarioController.inserirUsuario)
router.put("/:id",middlewaresAutenticacao.bearer,usuarioController.atualizarUsuario)
router.delete("/:id",middlewaresAutenticacao.bearer,usuarioController.deletarUsuario)

export default router