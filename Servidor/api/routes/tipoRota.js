const router = require('express').Router()
const tipoController = require("../controllers/TipoController")

router.get("/listar",tipoController.listarTipos)
router.post('/inserir',tipoController.inserirTipo)
router.put('/atualizar/:id',tipoController.atualizarTipo)
router.delete("/deletar/:id",tipoController.deletarTipo)


module.exports = router