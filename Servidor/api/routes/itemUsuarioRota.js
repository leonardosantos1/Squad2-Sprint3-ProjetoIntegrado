const router = require('express').Router()
const itemUsuarioController = require("../controllers/ItemUsuarioController")
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')

router.get("/",itemUsuarioController.listarItensUsuario)
router.get("/:id",itemUsuarioController.listarItemUsuario)
router.post('/',middlewaresAutenticacao.bearer,itemUsuarioController.inserirItemUsuario)
router.put('/:id',middlewaresAutenticacao.bearer,itemUsuarioController.atualizarItemUsuario)
router.delete("/:id",middlewaresAutenticacao.bearerAdm,itemUsuarioController.deletarItemUsuario)


module.exports = router