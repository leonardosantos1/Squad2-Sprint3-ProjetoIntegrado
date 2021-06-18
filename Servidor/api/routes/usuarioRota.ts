import {Router} from 'express'
const router =  Router()

import usuarioController from '../controllers/UsuarioController'

const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get('/',usuarioController.listarUsuarios)
router.get('/:id',middlewaresAutenticacao.bearer,usuarioController.listarUsuario)//teste somente adm pode acessar essa rota
router.post('/',usuarioController.inserirUsuario)
router.put("/:id",middlewaresAutenticacao.bearer,usuarioController.atualizarUsuario)
router.delete("/:id",middlewaresAutenticacao.bearer,usuarioController.deletarUsuario)

export default router