import {Router} from 'express'
const router =  Router()
import tipoController from "../controllers/TipoController"
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get("/",tipoController.listarTipos)
router.get("/:id",tipoController.listarTipo)
router.post('/',middlewaresAutenticacao.bearer,tipoController.inserirTipo)
router.put('/:id',middlewaresAutenticacao.bearer,tipoController.atualizarTipo)
router.delete("/:id",middlewaresAutenticacao.bearer,tipoController.deletarTipo)


export default router