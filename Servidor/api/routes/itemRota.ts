import {Router} from 'express'
const router = Router()

import itemController  from "../controllers/ItemController"

const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get("/",itemController.listarItens)
router.get("/:id",itemController.listarItem)
router.post('/',middlewaresAutenticacao.bearer,itemController.inserirItem)
router.put('/:id',middlewaresAutenticacao.bearerAdm,itemController.atualizarItem)
router.delete("/:id",middlewaresAutenticacao.bearerAdm,itemController.deletarItem)

export default router

