const router = require('express').Router()
const itemUsuarioController = require("../controllers/ItemUsuarioController")

router.get("/listar",itemUsuarioController.listarItensUsuario)
router.get("/buscar/:id",itemUsuarioController.listarItemUsuario)
router.post('/inserir',itemUsuarioController.inserirItemUsuario)
router.put('/atualizar/:id',itemUsuarioController.atualizarItemUsuario)
router.delete("/deletar/:id",itemUsuarioController.deletarItemUsuario)


module.exports = router